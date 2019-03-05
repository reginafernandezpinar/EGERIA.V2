var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');

/* GET public home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
// Get featured/all trips
router.get('/mytrips/api/trips', tripControllers.findAll);
// Get a trip
router.get('/mytrips/api/trips/:id', tripControllers.findOne);



/* GET private home page. */
router.get('/token/:token', Token.verifyParam, function(req, res, next) { 
  res.render('homelogin', {token: req.params.token});
});


// // estas rutas están en trip.js, pendiente ruta de la peticion del front main.js 






module.exports = router;
