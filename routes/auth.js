var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");

// router.get('/login', function (req, res, next) {
//     res.render('login/index', { 'message': null });
// });

router.post("/login", userController.doLogin);


// router.get('/logout', function (req, res, next) {
//     res.render('/auth/login');
// });


module.exports = router;