var mysql = require('mysql');
var crypto = require('crypto');
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'yujin',
    password : 'root',
    database : 'my_db'
  });

var id = 'KAU'


// var sql = 'SELECT * FROM users WHERE id=?';    
// var password ='';

// con.query(sql, [id], function(err, results){
//   var users = results[0];
//   password = users.password;
//   console.log(password);
// });


var salt = '';
var pw = '';
crypto.randomBytes(64, (err, buf) => {
  if (err) throw err;
  salt = buf.toString('hex');
  console.log("salt");
  console.log(salt);
});


crypto.pbkdf2('asdf', salt, 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  pw = derivedKey.toString('hex');
  console.log(pw);
});


// var pw = '66dd20b45bc3168700f5ba6bd3df8643c0f3782683314bd2799df5d58c415c5a83e3fa08dbcf0f64d92d742a8f8417c06790cc803cb347e58f2d9d2873528abc'
// var salt = '27b783b7e68139a2a5f4f193e52938cb9a7772194da52660cf38cd469fc61e49578413542a382ca9788df61a9e88eed64d4f3a474edbca9becaa98e5b548afcd'
// var sql = "UPDATE users SET password=? WHERE id=?";
// con.query(sql,[pw, id], function (err, result) {
//   if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");

// });




