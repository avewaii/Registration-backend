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

//прослушка GET-запросов по адресу localhost3000/api/users
router.get('/', function(req, res, next) { 
    connection.query('SELECT * FROM users', function(err, results) {    
        res.send({...results})

      console.log(err);
      console.log(results); // собственно данные 
  });
})

//прослушка POST-запросов по адресу localhost3000/api/users
router.post('/', function(req, res, next) {


  // если регистрация
  let data = [req.body.name, req.body.email, req.body.status, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'), req.body.password]; 

    connection.query('INSERT INTO users(name, email, status, registrationdate, lastLogin, password) VALUES(?, ?, ?, ?, ?, ?) ', data, function(err, results, fields) { 
      !err ? res.json(results) : res.json(err);
    })

  // если авторизация

  // connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [data[1], data[5]], function(err, results) {
  //   !err ? alert('GREAT!', results) : alert('YOU NEED TO REGISTER');
  // })

})

module.exports = router;
