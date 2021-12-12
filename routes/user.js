// USE FOR ADD MASTER ID
// START TO COMMAND 'node user.js' 
/**********  PLEASE SET ID, PASSWORD HERE  ***********************/

var id = 'master'
var password = 'kau1234#'

/************************************************************** */


var mysql = require('mysql');
const bcrypt = require('bcrypt')

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'yujin',
    password : 'root',
    database : 'my_db'
});

// SECURE ENCRYPT 암호화
const encryptedPassowrd = bcrypt.hashSync(password, 10) // sync
// console.log(encryptedPassowrd);


// New Join 회원가입
var sql ="INSERT INTO USERS (id, password) VALUES(?,?)";
con.query(sql,[id, encryptedPassowrd], function (err, result) {
    if (err) {
      console.log('******Already Exist ID, Please Try other********');
      throw err;
    }
      console.log(result.affectedRows + " record(s) updated");
  });

// Change Password  비밀번호 변경
// var sql = "UPDATE users SET password=? WHERE id=?";
// con.query(sql,[encryptedPassowrd, id], function (err, result) {
//   if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
// });


// LOGIN  로그인
// var login_id = 'KAU'
// var login_password = '1234'

// var sql = 'SELECT * FROM users WHERE id=?';    
// con.query(sql, [id], function(err, results){
//     var users = results[0];
//     var db_password = users.password;
//     const same = bcrypt.compareSync(login_password, db_password)
//     console.log(same);
// });


