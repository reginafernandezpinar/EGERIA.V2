var express = require('express');
var router = express.Router();


// Aquí gestionamos http://localhost:3000/??

/* API DESCRIPTION 5 metodos de routers */ 


const tripControllers = require ('../controllers/tripController')

router.get('/', tripControllers.findAll);
router.get('/:id', tripControllers.findOne);

router.delete('/:id', tripControllers.deleteOne);

router.post('/', function (req, res, next) {
  res.send('not yet implemented');
});

router.put('/:id', function (req, res, next) {
  res.send('not yet implemented');
});



module.exports = router;
