const userModel = require('../models/userModel');
var crypt = require('../crypt-util');
const Token = require('../auth/token')


function loginUser(req, res) {
    const ue = req.body.email;
    userModel.findByUseremail(ue)
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
                        'firstname': user.firstname,
                        'token': Token.buildToken(user.id) // el q sea
                    });
                }
            }
        })
        .catch(err => {
            res.render('error', { message: { color: 'red', text: 'something failed' }, error: err });
        })
}

function registerUser  (req, res) {
    console.log('asldfjaksdf');
    const user = req.body;
    user.password = crypt.encrypt(user.password);
    userModel.createUser(user)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send({message:'something failed', error: err})
        }
    );
};



module.exports = {
    loginUser,
    registerUser
}