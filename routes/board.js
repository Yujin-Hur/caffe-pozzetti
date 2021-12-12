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

router.get('/menu', function(req, res, next) { 
    res.render('menu');
});
// community page
router.get('/community', function(req, res, next) { 
    res.render('community');
});

// event main page
var idx = 0;
router.get('/event', function(req, res, next) { 
    res.redirect('/board/event/1');
});

router.get('/event/:page', function(req, res, next){
    var page = req.params.page;
    var sql = "SELECT idx, name, title, date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate " + "from event";
        connection.query(sql, function(err, rows){ 
        if(err) console.error("err : " + err);
        res.render('event', {rows:rows});
    });
});


// event write page (master)
router.get('/write', function(req, res, next){  
    var sql = "SELECT COUNT(*) as cnt FROM event"
    connection.query(sql,function(err, result){ 
        if (err) console.error("err : " + err);
        idx = result[0].cnt;
    });
    res.render('write')
});

router.post('/write', function(req, res, next){
    var sql = "SELECT COUNT(*) as cnt FROM event"
    connection.query(sql,function(err, result){ 
        if (err) console.error("err : " + err);
        idx = result[0].cnt + 1;
    });

    var name = req.body.name;                   
    var title = req.body.title;
    var content = req.body.content;
    // var passwd = req.body.passwd;
    var datas = [name, title, content, idx]; 
    var sql = "insert into event(name, title, content, regdate, modidate, hit, idx) values(?,?,?,now(),now(),0,?)";  // ? 는 매개변수
    connection.query(sql, datas, function(err,rows){ 
        if (err) console.error("err : " + err);
        res.redirect('/board/event')
    });
});


// view: event 상세 페이지
router.get('/view/:idx', function(req, res, next){ 
    var idx = req.params.idx; 
    var sql = "SELECT idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +   
        "content, hit from event where idx=?";
        connection.query(sql,[idx], function(err, rows){ 
        if(err) console.error("err : " + err);
        res.render('view', {title : '글 상세보기', rows:rows[0]}); // 첫번째행 한개의데이터만 랜더링 요청
    });
});


// 내용 수정
// router.post('/update', function(req, res, next){
//     var idx = req.body.idx;
//     var name = req.body.name;
//     var title = req.body.title;
//     var content = req.body.content;
//     var passwd = req.body.passwd;
//     var datas = [idx, name, title, content, passwd]; 

//     var sql = "UPDATE event set name=?, title=?, content=? ,modidate=now() where idx=? and passwd=?"; 
//     connection.query(sql, datas, function(err, result){
//         if (err) console.error(err);
//         if(result.affectedRows == 0) 
//         { res.send("<script>alert('비밀번호가 일치하지않습니다');history.back();</script>")
//         } else {
//             res.redirect('/board/read/' + idx);
//         }
//     });
// });

// router.get('/page/:page', function(req, res, next){ // 게시글 리스트에 :page가 추가된것임
//     var page = req.params.page; // 현재 페이지는 params 을 req 요청받아옴
//     var sql =  "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
//     "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from event";  // select 구절 그대로

//     connection.query(sql, function(err, rows){
//         if (err) console.err("err : " + err);
//         res.render('page', {title : '글목록', rows:rows, page:page, length:rows.length-1, page_num:10, pass:true}); 
//         // length 데이터 전체넘버 랜더링,-1을 한이유는 db에서는1부터지만 for문에서는 0부터 시작 ,page_num: 한페이지에 보여줄 갯수
//         console.log(rows.length-1);
//     });
// });

// router.post('/delete', function(req,res,next){
//     var idx = req.body.idx;
//     var passwd = req.body.passwd;
//     var datas = [idx, passwd];

//     var sql = "delete from event where idx=? and passwd=?"; // 업데이트 수정과 거의 비슷한 쿼리문
//     connection.query(sql, datas, function(err, result){
//         if(err) console.error(err);
//         if(result.affectedRows == 0){
//             res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
//         } else {
//             res.redirect('/board/list');
//         }
//     });
// });

module.exports = router;