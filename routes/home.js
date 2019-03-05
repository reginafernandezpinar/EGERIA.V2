var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});


router.get('/token/:token', Token.verifyParam, function(req, res, next) { 
  res.render('homelogin', {token: req.params.token});
});


// // estas rutas están en trip.js, pendiente ruta de la peticion del front main.js 
// // Get featured/all trips
// router.get('/:token/api/trips', tripControllers.findAll);

// // // Get a trip
// router.get('/:token/api/trips/:id', tripControllers.findOne);


module.exports = router;
