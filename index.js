import express from "express";
import { Client } from "pg";

const PORT = process.env.PORT || 5432;

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "localhost",
});

const app = express();

app.get("/ping", async (req, res) => {
  const database = await client.query("SELECT 1 + 1").then(() => "up").catch(() => "down");

  res.send({
    environment: process.env.NODE_ENV,
    database,
  });
});

(async () => {
  await client.connect();

  app.listen(PORT, () => {
    console.log("Started at http://localhost:%d", PORT);
  });
})();

// pool.connect(function (err, client, done){
//   if(err){
//     console.log(err);
//   } 
//   myClient = client;
//   var init = 
// }

// pool.connect();

// pool.query("CREATE TABLE posts(id SERIAL PRIMARY KEY, url TEXT NOT NULL, numComments TEXT NOT NULL, body TEXT NOT NULL, votes TEXT NOT NULL, author TEXT NOT NULL, other jsonb)", (err, res) => {
// console.log(err, res);
// pool.end();
// });

// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   app.listen(3000, function () {
//     console.log('listening on 3000')
//   })
//   myClient = client
//   var ageQuery = format('SELECT * from numbers WHERE age = %L', age)
//   myClient.query(ageQuery, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(result.rows[0])
//   })
// })

// const oracledb = require('oracledb');
// function getEmployee(empId) {
//   return new Promise(async function(resolve, reject) {
//     let conn; // Declared here for scoping purposes.
//     try {
//       conn = await oracledb.getConnection();
//       console.log('Connected to database');
//       let result = await conn.execute(
//         `select *
//         from employees
//         where employee_id = :emp_id`,
//         [empId],
//         {
//           outFormat: oracledb.OBJECT
//         }
//       );
//       console.log('Query executed');
//       resolve(result.rows[0]);
//     } catch (err) {
//       console.log('Error occurred', err);
//       reject(err);
//     } finally {
//       // If conn assignment worked, need to close.
//       if (conn) {
//         try {
//           await conn.close();
//           console.log('Connection closed');
//         } catch (err) {
//           console.log('Error closing connection', err);
//         }
//       }
//     }
//   });
// }
// module.exports.getEmployee = getEmployee;

