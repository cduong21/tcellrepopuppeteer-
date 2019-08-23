# Puppeteer Web Scraper and Postgresql 

## Project Overview 
Web scraping and crawling is beneficial for collecting data from websites. Puppeteer is a Node Library that provides an API for Chrome to crawl and scrape. To download follow the instructions here: https://www.npmjs.com/package/puppeteer

There are tons of different resources online to learn about web scraping, we followed a few tutorials listed here:

	* https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
	* https://medium.com/swlh/an-introduction-to-web-scraping-with-puppeteer-3d35a51fdca0
	* https://github.com/checkly/puppeteer-examples 

After understanding the syntax of Javascript this web scraper was used to crawl through hacker news and first click all the links on the first page. All the pages that are clicked are then filtered for a select security buzzword. Finally, the console log will print the urls that returned true for the keyword match. A json file is created and the goal is to migrate the data to the postgresql databases. 

These files are dockerized to make running them on your local machine simple. 

## Launching 
	* docker-compose build
	* docker-compose up (will show the postgres docker container and the puppeteer container) 
	* docker-compose down (to close) 

## Postgresql 
There is a lot of space for development here, but our main learning point was understanding how tables are created and the basics of sql database commands. We were able to manually input information, but once again, there are loads of information about moving json data to a postgresql database. 
