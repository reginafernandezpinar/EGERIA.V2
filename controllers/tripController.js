// este es el controlador que no sabe cuales son los datos(estan en el modelo), por seguridad.

const tripModel = require("../models/tripModel"); // importamos el modelo

// Get featured/all trips
function findAll (req, res) {
    tripModel.findAll(req.query.limit, (err, result) => {
        if (err) res.send({message: 'something failed', error: err});
        res.send(result);
    });
}

// Create new trip
function save(req, res) {
    tripModel.save(req.body, (err, result) => {
        if (err) res.send({message: 'something failed', error: err});
        res.send(result);
    });
}

// Get a trip
function findOne(req, res) {
    const id = req.params.id;
    tripModel.findTripById(id)
    .then(result => {res.send(result); // responde al resolve
    })
    .catch(err => { // responde al reject
        res.send({message:'something failed', error: err});
    })
    
}

// Delete a trip
function deleteOne(req, res) {
    const id = req.params.id;
    tripModel.deleteTripById(id)
    .then(result => {res.send(result);
    })
    .catch(err => {
        res.send({message:'something failed', error: err});
    })
    
}

// Update a trip
function update(req,res){
    const id = req.params.id;
    const trip = req.body;
    tripModel.updateTripById(trip, id)
    .then(result => res.send(result)
    )
    .catch(err =>
        res.send({message:'something failed', error: err})
    )
}

// function deleteOne(req, res) {
//     const id = req.params.id;
//     const trip = tripModel.deleteTripById(id);
//     res.send(trip);
// }


module.exports = {
    findAll,
    save,
    findOne,
    deleteOne,
    update
};