// 게시판 (event,...)

var express = require('express');
var router = express.Router();
var mysql = require('mysql');  
var connection = mysql.createConnection({ 
    host : 'localhost',
    user     : 'yujin',
    password : 'root',
    database : 'cafe',
    multipleStatements: true
});

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "views/img/community");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });

// event main page
var idx = 0;
router.get('/', function(req, res, next) { 
    var sql = "SELECT name, idx, content, image, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate " + "from community";
        connection.query(sql, function(err, rows){ 
        if(err) console.error("err : " + err);
        // console.log(rows)
        res.render('community', {rows:rows});
    });
    // res.redirect('/community/1');
});

// router.get('/:page', function(req, res, next){
//     var page = req.params.page;
//     var sql = "SELECT idx, name, title, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate " + "from event";
//         connection.query(sql, function(err, rows){ 
//         if(err) console.error("err : " + err);
//         res.render('event', {rows:rows});
//     });
// });


// review write page (master)
router.get('/review', function(req, res, next){  
    var sql = "SELECT COUNT(*) as cnt FROM community"
    connection.query(sql,function(err, result){ 
        if (err) console.error("err : " + err);
        idx = result[0].cnt;
    });
    res.render('review')
});

router.post('/review', upload.single("image"), (req, res, next) => {
    var sql = "SELECT COUNT(*) as cnt FROM community"
    connection.query(sql,function(err, result){ 
        if (err) console.error("err : " + err);
        idx = result[0].cnt + 1;
    });              
    var name = req.body.name;
    var content = req.body.content;
    const image = `/img/community/${req.file.filename}`; // image 경로 만들기
    // var passwd = req.body.passwd;
    var datas = [name, content, idx, image]; 
    console.log(datas)

    var sql = "insert into community(name, content, idx, image, modidate) values(?,?,?,?,now())";  
    connection.query(sql, datas, function(err,rows){ 
        if (err) console.error("err : " + err);
        res.redirect('/community')
    });
});


// view: event 상세 페이지
router.get('/view/:idx', function(req, res, next){ 
    var idx = req.params.idx; 
    var sql = "SELECT idx, name, image, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +   
        "content, from community where idx=?";
        connection.query(sql,[idx], function(err, rows){ 
        if(err) console.error("err : " + err);
        res.render('view', {title : '글 상세보기', rows:rows[0]});
    });
});

module.exports = router;