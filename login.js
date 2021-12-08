var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var crypto = require('crypto');
// var dbConfig = require('./dbConfig');
 
var app = express();

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'yujin',
    password : 'root',
    database : 'my_db'
  });


conn.connect();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', function (req, res) {
//   res.send('<a href="/login">login</a>');
  res.render('home');
});
app.get('/login', function(req, res){
  res.render('login');
});
 
app.post('/login', function(req, res) {
    var id = req.body.username;
    var pw = req.body.password;
    var sql = 'SELECT * FROM users WHERE id=?';
    
    conn.query(sql, [id], function(err, results){
      if(err)
        console.log(err);
 
      if(!results[0])
        return res.send('please check your id.');
 
      var user = results[0];
      if(pw === user.password){
        return res.send('login success');
      }
      else {
        return res.send('please check your password.');
      }
    });//query
  }
);
 
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});