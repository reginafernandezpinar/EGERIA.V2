const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const salt = require('./salt').secret;

function verifyToken(req, res, next) {
    // check header for token
    var token = req.header('Authorization');
    checkToken(token, req, res, next);
}

function verifyTokenFromParam(req, res, next) {
    // check url parameters for token
    var token = req.query.token;
    checkToken(token, req, res, next);
}

function checkToken(token, req, res, next) {
    if (!token)
        return res.status(403).send({ auth: false, message: 'Bad credentials' });
    // verifies secret and checks exp
    jwt.verify(token, salt, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // if everything is good, save user object to request for use in other routes
        req.user = decoded.id;
        next();
    });
}

function buildToken(key) {
    // if user is found and password is valid. Create a token
    var token = jwt.sign({ id: key }, salt, {
        //expiresIn: 86400 // expires in 24 hours
        expiresIn: 3600 // expires in 1 hour
    });
    return token;
}

module.exports = {
    verifyToken,
    verifyTokenFromParam,
    buildToken
};