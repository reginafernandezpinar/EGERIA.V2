// MODELO se comunica con la DB

const dbConn = require('../config/mysql');


// Callback: cb llama a la funcion del controlador findAll. Asi se comunican entre ellos porque es asincrona

// Get featured/all trips
const findAll = (limit, cb) => {
    let sql = `SELECT * FROM trip`;
    if (limit) {
        sql += ` LIMIT ${limit}`;
    }
    dbConn.query (sql, (err, res) => cb (err, res));
};


// Create new trip
const save = (trip, cb) => {
    let sql = `INSERT INTO trip (name, description, companionship, photo) VALUES ('${trip.name}', '${trip.description}', '${trip.companionship}', '${trip.photo}')`;
    // console.log(trip.name);
    dbConn.query(sql, function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            let newTrip = {
                id: result.insertId,
                name: req.body.name,
                description: req.body.description,
                companionship: req.body.companionship,
                photo: req.body.photo
            }
            cb(null, newTrip);
        }
    });
}


// Get a trip (Promesa)
const findTripById = id => {
    let sql = `SELECT * FROM trip WHERE id = ${id}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


// Delete a trip
const deleteTripById = id => {
    let sql = `DELETE FROM trip WHERE id = ${id}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}
//const removeTripById = id => trips.splice(trips.findIndex(trip => trip.id == id), 1)


// Update a trip
const updateTripById = (trip, id) => {
    let sql = `UPDATE trip SET name = '${trip.name}', description = '${trip.description}', companionship = '${trip.companionship}', photo = '${trip.photo}' WHERE id = '${id}'`;
    // console.log(trip.name);
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


// estos metodos los usa el controlador
module.exports = {
    findAll,
    save,
    findTripById,
    deleteTripById,
    updateTripById
};