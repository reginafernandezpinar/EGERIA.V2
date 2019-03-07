const dbConn = require('../config/db/mysql');

//cb: Callback, it calls controller function

////////// Public
// Get featured/all trips
const findAll = (limit, cb) => {
    let sql = `SELECT * FROM trip`;
    if (limit) {
        sql += ` LIMIT ${limit}`;
    }
    dbConn.query (sql, (err, res) => cb (err, res));
};
// Get a trip
const findTripById = id => {
    let sql = `SELECT * FROM trip WHERE id = ${id}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


//////// Private
// Get all trips from an user
const getUserTrips = userId => {
    let sql = `SELECT * FROM trip where user_id = ${userId}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

// Create new trip
const save = (trip, userId, cb) => {
    let sql = `INSERT INTO trip (user_id, name, description, companionship, photo) VALUES ('${userId}', '${trip.name}', '${trip.description}', '${trip.companionship}', '${trip.photo}')`;
    // console.log(trip.name);
    dbConn.query(sql, function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            let newTrip = {
                id: result.insertId,
                userId: userId,
                name: trip.name,
                description: trip.description,
                companionship: trip.companionship,
                photo: trip.photo
            }
            cb(null, newTrip);
        }
    });
}
// Delete a trip
const deleteTripById = (tripId, userId) => {
    let sql = `DELETE FROM trip WHERE id = ${tripId} AND user_id = ${userId}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}
//const removeTripById = id => trips.splice(trips.findIndex(trip => trip.id == id), 1)
// Update a trip
const updateTripById = (trip, id, userId) => {
    let sql = `UPDATE trip SET name = '${trip.name}', description = '${trip.description}', companionship = '${trip.companionship}', photo = '${trip.photo}' WHERE id = '${id}' AND user_id = ${userId}`;
    // console.log(trip.name);
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


module.exports = {
    findAll,
    save,
    findTripById,
    deleteTripById,
    updateTripById,
    getUserTrips
};