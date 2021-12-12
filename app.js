var express = require('express');
var ejs = require('ejs')
var app = express();
var bodyParser = require('body-parser')
// var fs = requre('fs');

app.set('view engine', 'ejs'); 
app.set('views', './views/') 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(express.static('views'));


var mainRouter = require('./routes/main')
var boardRouter = require('./routes/board')
var loginRouter = require('./routes/login')

app.use('/cafe', mainRouter);
app.use('/login', loginRouter);
app.use('/board', boardRouter);


app.get('/', function(req, res, next) { 
    res.redirect('/cafe');
});
// app.get('/img', function(req, res, next) { 
//     fs.readFile('cafe_poze1.jpg',function(error, data){
//         res.writeHead(200,{'content-Type': 'text/html'});
//         res.end(data);
//     })
// });

app.listen(3000);