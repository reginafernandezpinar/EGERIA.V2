// MODELO REAL: se comunica con la DB:

const dbConn = require('../config/mysql');


// Callback: cb llama a la funcion del controlador findAll. Asi se comunican entre ellos porque es asincrona

// Get featured/all trips
const findAll = (cb) => {
    let sql = `SELECT * FROM trip`;
    // if (req.query.limit) {
    //     sql += ` LIMIT ${req.query.limit}`;
    // }??
    dbConn.query (sql, (err, res) => {
        if (err) cb(err, null);
        cb (null, res);
    });
};


// Create new trip
const createNewTrip = (req, res) => {
    let sql = `INSERT INTO trip (name, description, companionship, photo) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.companionship}', '${req.body.photo}')`;
    // console.log(req.body.name);
    dbConn.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            let trip = {
                id: result.insertId,
                name: req.body.name,
                description: req.body.description,
                companionship: req.body.companionship,
                photo: req.body.photo
            }
            res.send(trip);
        }
    });
}



// Promesa // me da error!!
const findCustomerById = id => {
    const theQuery = SQL_FIND_BY_ID(id);
    return new Promise ((resolve, reject) => {
        dbConn.query(theQuery, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


// estos metodos los usa el controlador
module.exports = {
    findAll,
    findCustomerById,/*
    removeCustomerById*/
};