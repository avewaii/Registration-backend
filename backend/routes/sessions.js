const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const moment = require('moment');
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "auth",
  password: "12345678"
});

connection.connect();


router.get('/', function(req, res, next) { 
    connection.query('SELECT * FROM sessions', function(err, results) {    
        res.send({title: 'Eve is SO cool', ...results.reduce((a,x) => ({...a, [x.name]: x.count}), {})})

      console.log(err);
      console.log(results); // собственно данные 
  });
})

//прослушка POST-запросов по адресу localhost3000/api/sessions
router.post('/', function(req, res, next) { 

    let data = [req.body.email, req.body.password];
  
     connection.query(`SELECT idSession FROM sessions WHERE email = ${data[0]} AND password = ${data[1]}`, function(err, results) {    
        
      res.send({eve: 'cool'});
      
      //res.send({...results})
    //   console.log(err);
    //   console.log(results); // собственно данные 
     });
  })
  
  module.exports = router;