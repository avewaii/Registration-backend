var express = require('express');
var mysql = require('mysql');
var router = express.Router();

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678"
});
con.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  con.query("SELECT * FROM eve.stuff", (err, resp) => {
    res.send({title: 'Eve is SO cool', ...resp.reduce((a,x) => ({...a, [x.name]: x.count}), {})})
  });
});

router.get("/pay", (req, res) => {
  con.query("UPDATE eve.stuff SET count = count + " + req.query.amount + " WHERE name = 'money'", (err, resp) => {
    res.send({resp, err})
  })
})

module.exports = router;