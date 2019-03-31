const userModel = require('../models/userModel');
var crypt = require('../crypt-util');
const Token = require('../auth/token');


function loginUser(req, res) {
    const ue = req.body.email;
    userModel.findUserByEmail(ue)
        .then(result => {
            if (result.length !== 1) {
                res.render('login', { message: { type: 'error', text: 'bad credentials' } });
            } else {
                const user = result[0]; // result is an array whose first position is the user object.
                const pwd = req.body.password;
                const dbPwd = user.password; //user.password gets the password from the DB, then it is compared against the one introduced
                const cryptPasswd = crypt.encrypt(pwd);
                console.log("dbPwd:" + dbPwd);
                console.log("crPwd:" + cryptPasswd);
                if (cryptPasswd !== dbPwd) {
                    res.render('login', { message: { type: 'error', text: 'bad credentials' } });
                } else {
                    let token = Token.buildToken(user); // create token with the entire object(user) 
                    console.log("token:" + token);
                    res.redirect(`/?token=${token}`); // redirect homepage with the token as an url parameter
                }
            }
        })
        .catch(err => {
            console.log("error login: " + err);
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        });
}


function registerUser (req, res) {
    let user = req.body;
    user.password = crypt.encrypt(user.password);
    userModel.createUser(user)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        });
}


function whoAmI (req, res) {
    console.log('request', req.user); // user is injected in the req object by the verifyToken middleware
    userModel.findUserByEmail(req.user.email)
        .then(result => { // result is an array whose first position is the user object.
            let user = result[0]; 
            res.send(user.username);
        }).catch(err => {
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        });
}


module.exports = {
    loginUser,
    registerUser,
    whoAmI
}