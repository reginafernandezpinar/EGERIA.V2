var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* API DESCRIPTION */

const tripControllers = require ('../controllers/tripController');


// Get featured/all trips
router.get('/api/trips', tripControllers.findAll);

// Get a trip
router.get('/api/trips/:id', tripControllers.findOne);


module.exports = router;
