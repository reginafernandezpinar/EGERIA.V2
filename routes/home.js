var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');

/* GET public home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});



module.exports = router;
