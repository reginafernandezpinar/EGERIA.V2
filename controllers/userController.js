const userModel = require('../models/userModel');
var crypt = require('../crypt-util');
const Token = require('../auth/token')


function loginUser(req, res) {
    const ue = req.body.email;
    userModel.findUserByEmail(ue)
        .then(result => {
            if (result.length !== 1) {
                res.render('login', { message: { type: 'error', text: 'bad credentials' } });
            } else {
                const user = result[0];
                const pwd = req.body.password;
                const dbPwd = user.password; //user.password, la recoge de la base de datos para poder compararlas
                const cryptPasswd = crypt.encrypt(pwd);
                console.log("dbPwd:" + dbPwd);
                console.log("crPwd:" + cryptPasswd);
                if (cryptPasswd !== dbPwd) {
                    res.render('login', { message: { type: 'error', text: 'bad credentials' } });
                } else {
                    let token = Token.buildToken(user); //  (user) crea el token con todo el objeto
                    console.log("token:" + token);
                    res.redirect(`/?token=${token}`);
                }
            }
        })
        .catch(err => {
            console.log("error login: " + err);
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        })
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
    console.log('whoAmI');
    console.log('user', Object.keys(req.user)); // ver en consola comandos las claves del objeto
    res.send(req.user);
}


module.exports = {
    loginUser,
    registerUser,
    whoAmI
}