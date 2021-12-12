var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home')
});

router.get('/info', function (req, res, next) {
    res.render('info')
});

router.get('/menu', function (req, res, next) {
    res.render('menu')
});


module.exports = router;

