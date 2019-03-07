var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');

// It manages http://localhost:3000/mytrips

router.get('/', Token.verifyTokenFromParam, function (req, res, next) { 
  res.render('private/mytrips');
});


/* TRIP API DESCRIPTION */ 

///////// Public
// Get featured/all trips
router.get('/api/trips',  tripControllers.findAll);
// Get a trip
router.get('/api/trips/:id', tripControllers.findOne);



/////// Private
// Get all trips from an user
router.get('/api/userTrips', Token.verifyTokenFromParam, tripControllers.getUserTrips);
// Delete a trip from an user
router.delete('/api/:id', Token.verifyToken, tripControllers.deleteOne);
// Update a trip from an user
router.patch('/api/:id', Token.verifyToken, tripControllers.update);
// Create a new trip as an user
router.post('/api/new', Token.verifyToken, tripControllers.save);




module.exports = router;
