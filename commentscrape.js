// const oracledb = require('oracledb');        
// const dbConfig = require('./db-config.js');      
// const employees = require('./employees.js');
// async function startApp() {
//   try {
//     await oracledb.createPool(dbConfig);
//     let emp = await employees.getEmployee(101);
//     console.log(emp);
//   } catch (err) {
//     console.log('Opps, an error occurred', err);
//   }
// }
// startApp();


const puppeteer = require("puppeteer");
const fs = require("fs");
const pg = require("pg");
const retry = require("retry");

const dbConfig = require("./config.js")

async function connDB() {
  try{
    var operation = retry.operation({retries:3})

    operation.attempt(function() {
      var client = new pg.Client()
      client.connect(function(e){
        client.end()
        if(operation.retry(e)) {
          return;
        }
        if(!e) console.log("Hello Postgres!")
      })
    })

  }catch (err){
    console.log('DB did not connect');
  }
}


async function scrape () {
  const browser = await puppeteer.launch({ 
    headless: true,
    //executablePath: "./node_modules/puppeteer/.local-chromium/mac-672088/chrome-mac/Chromium.app/Contents/MacOS/Chromium",
    //executablePath: "/node_modules/puppeteer/.local-chromium/linux-672088",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  try {
    
    // open a new page
    var page = await browser.newPage();

    // enter url in page
    await page.goto(`https://news.ycombinator.com/`, {waitUntil: "networkidle2"});

    await page.waitForSelector(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.subtext > a:nth-child(6)`);
        
    var comments = await page.evaluate(() => {
      var commentNodeList = new Array();
      var n = 2;
      for (var i = 0; i <=30; i++){
        commentNodeList[i] = document.querySelector(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(`+n+`) > td.subtext > a:nth-child(6)`);
        n+=3;
      }

      var commentData = new Array();
      for (var j = 0; j < commentNodeList.length - 1; j++){
        if (commentNodeList[j] == null || commentNodeList[j].innerText.trim() == "discuss"){
          commentData[j] = {
            content: "null",
            link: "null",
          };
        }
        else{
          commentData[j] = {
            count: j,
            content: commentNodeList[j].innerText.trim(),
            link: commentNodeList[j].getAttribute("href"),
          };
        }
      }
      
      return commentData;
    });

    var matchedLinks = new Array();
    var numComments = new Array();


    for(v = 0; v < comments.length-1; v++){
      await page.goto(`https://news.ycombinator.com/` + comments[v].link, {waitUntil: "networkidle2"});
      const match = await page.evaluate(() => window.find("bots"));
      if (match == true){
        //console.log(`https://news.ycombinator.com/` + comments[v].link + ' --> ' + match);
        matchedLinks.push(`https://news.ycombinator.com/` + comments[v].link); 
        numComments.push(comments[v].content);
      }
      else{
        //console.log();
      }
    }


    console.log(matchedLinks); // link of each article that matched the word we searched
    console.log(numComments); // number of comments for each link

    // store these in postgres database ^^ 



    fs.writeFile("comments.json", JSON.stringify(comments), function(err) {
        if (err) throw err;
        console.log("Saved!");
    });


    await browser.close();
    console.log("Browser Closed");
  } catch (err) {
    console.log(err);
    await browser.close();
    console.log("Browser Closed");
  }
}

connDB();