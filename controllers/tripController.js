// este es el controlador que no sabe cuales son los datos(estan en el modelo), por seguridad.

const tripModel = require("../models/tripModel"); // llamamos al modelo

function findAll (req, res) {
    tripModel.findAll( (err, result) => {
        // if (req.query.limit) {
        // sql += ` LIMIT ${req.query.limit}`;
        // }??
        if (err) res.send({message: 'something failed', error: err});
        res.send(result);
    });
}

function findOne(req, res) {
    const id = req.params.id;
    tripModel.findTripById(id)
    .then(result => {res.send(result); // responde al resolve
    })
    .catch(e => { // responde al reject
        res.send({message:'something failed', error: err});
    })
    
}

function deleteOne(req, res) {
    const id = req.params.id;
    const trip = tripModel.removeTripById(id);
    res.send(trip);
}

function save(req, res) {
    const newtrip = {
        id: req.body.id,
        name: req.body.name,

    }
}

module.exports = {
    findAll,
    findOne,
    deleteOne
};