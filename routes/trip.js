var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');


// Aquí gestionamos http://localhost:3000/mytrips

router.get('/:token/', Token.verifyParam, function(req, res, next) { 
  res.render('mytrips', {token: req.params.token});
});


/* API DESCRIPTION */ 

// Get featured/all trips
router.get('/api/trips', tripControllers.findAll);

// Get a trip
router.get('/api/trips/:id', tripControllers.findOne);

// Delete a trip
router.delete('/api/trips/:id', Token.verifyParam, tripControllers.deleteOne);

// Update a trip
router.patch('/api/trips/:id', tripControllers.update);

// Create new trip
router.post('/api/trips/new', tripControllers.save);




module.exports = router;
