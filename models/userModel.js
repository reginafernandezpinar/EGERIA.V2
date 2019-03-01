const dbConn = require('../config/mysql');


const findByUsername = id => {
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}



module.exports = {
    findByUsername,
}