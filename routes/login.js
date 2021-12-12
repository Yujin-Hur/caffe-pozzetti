//master.js
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'yujin',
    password : 'root',
    database : 'cafe'
  });


conn.connect();


router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function(req, res) {
    // var id = req.body.username;
    // var pw = req.body.password;
    // LOGIN  로그인
    var login_id =  req.body.username;
    var login_password = req.body.password;

    var sql = 'SELECT * FROM users WHERE id=?';    
    conn.query(sql, [login_id], function(err, results){
        if(err)
          console.log(err);
        if(!results[0])
        return res.send("<script>alert('존재하지 않는 아이디입니다.');history.back();</script>");
        var users = results[0];

        var db_password = users.password;
        const same = bcrypt.compareSync(login_password, db_password)
        console.log(same);
        if(same){
          res.redirect('/board/write')
        } else {
              return res.send("<script>alert('비밀번호가 일치하지 않습니다');history.back();</script>");
            }
    });
  }
);

module.exports = router; 