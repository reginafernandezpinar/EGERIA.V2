var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

// Aquí gestionamos http://localhost:3000/auth
router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);




// logout
router.get('/logout', function (req, res, next) {
    res.redirect('login');
})

module.exports = router;