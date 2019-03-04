var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// estas rutas están en trip.js, pendiente ruta de la peticion del front main.js 
// // Get featured/all trips
// router.get('/api/trips', tripControllers.findAll);

// // Get a trip
// router.get('/api/trips/:id', tripControllers.findOne);

module.exports = router;
