var express = require('express');
var router = express.Router();
const tripControllers = require ('../controllers/tripController');
const Token = require('../auth/token');


// It manages http://localhost:3000/mytrips

router.get('/?token=${token}', Token.verifyToken, function(req, res, next) { 
  res.render('/private/mytrips', {token: req.header('Authorization')}); // get the token from the url header
}); 


/* API DESCRIPTION */ 

// Get featured/all trips
router.get('/api/trips',  tripControllers.findAll);

// Get a trip
router.get('/api/trips/:id', tripControllers.findOne);

// Delete a trip
router.delete('/api/trips/:id', Token.verifyToken, tripControllers.deleteOne);

// Update a trip
router.patch('/api/trips/:id', Token.verifyToken, tripControllers.update);

// Create new trip
router.post('/api/trips/new', Token.verifyToken, tripControllers.save);




module.exports = router;
