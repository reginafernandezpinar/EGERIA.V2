var express = require('express');
var router = express.Router();

// Aquí gestionamos http://localhost:3000/mytrips
router.get('/', function (req, res) { 
  res.render('mytrips');    
});


/* API DESCRIPTION */ 

const tripControllers = require ('../controllers/tripController')

// Get featured/all trips
router.get('/api/trips', tripControllers.findAll);

// Get a trip
router.get('/api/trips/:id', tripControllers.findOne);

// Delete a trip
router.delete('/api/trips/:id', tripControllers.deleteOne);

// Update a trip
router.patch('/api/trips/:id', tripControllers.update);

// Create new trip
router.post('/api/trips/new', tripControllers.save);



module.exports = router;
