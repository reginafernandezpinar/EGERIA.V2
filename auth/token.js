const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const salt = require('./salt').secret; // get our salt file

function verifyToken(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.header('x-access-token');
    
    if (!token)
        return res.status(403).send({ auth: false, message: 'Bad credentials' });

    // verifies secret and checks exp
    jwt.verify(token, salt, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}


function verifyParam(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.params.token;
    if (!token) {
        token = req.body.token;
    }
    if (!token)
        return res.status(403).send({ auth: false, message: 'Bad credentials' });

    // verifies secret and checks exp
    jwt.verify(token, salt, function (err, decoded) {
    console.log("token verified: "+ err)        ;
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
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
    verifyParam,
    buildToken,
};