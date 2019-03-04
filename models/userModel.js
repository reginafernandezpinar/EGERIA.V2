const dbConn = require('../config/db/mysql');


const findByUseremail = ue => {
    let sql = `SELECT * FROM user WHERE email = ${ue}`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


const createUser = user => {
    let sql = `INSERT INTO user (email, username, password) VALUES ('${user.email}', '${user.username}', '${user.password})'`;
    return new Promise ((resolve, reject) => {
        dbConn.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}



module.exports = {
    findByUseremail,
    createUser
}