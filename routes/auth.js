var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const Token = require('../auth/token')

// It manages http://localhost:3000/auth
router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/whoAmI', Token.verifyToken, userController.whoAmI);


// fake logout
router.get('/logout', function (req, res, next) {
    res.redirect('/auth');
})

module.exports = router;