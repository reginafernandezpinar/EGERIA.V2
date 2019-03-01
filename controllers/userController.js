const userModel = require('../models/userModel');
// const crypt = require('../util/crypt-util');
// const Token = require('../auth/token')


function doLogin(req, res) {
    const un = req.body.username;
    userModel.findByUsername(un)
        .then(result => { 
            if (result.length !== 1) {
                res.render('login', { message: { type: 'error', text: 'bad credentials' } });
            } else {
                const user = result[0];
                const pwd = req.body.password;
                const dbPwd = user.password; //user.password, la recoge de la base de datos, para poder compararlas
                const cryptPasswd = crypt.encrypt(pwd);
                console.log("dbPwd:" + dbPwd);
                console.log("crPwd :" + cryptPasswd);
                if (cryptPasswd !== dbPwd) {
                    res.render('login', { message: { type: 'error', text: 'bad credentials' } });
                } else {
                    res.render('user', {
                        'message': { text: 'Login success', type: 'success' },
                        'username': un,
                        'fullname': user.fullname,
                        'token': Token.buildToken(user.id) // el q sea
                    });
                }
            }
        })
        .catch(err => {
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        })
}
module.exports = {
    doLogin,
}