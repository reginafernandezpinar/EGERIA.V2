// este es el controlador que no sabe cuales son los datos(estan en el modelo), por seguridad.

const tripModel = require("../models/tripModel"); // llamamos al modelo

function findAll (req, res) {
    tripModel.findAll(req.query.limit, (err, result) => {
        if (err) res.send({message: 'something failed', error: err});
        res.send(result);
    });
}


function save(req, res) {
    tripModel.save(req.body, (err, result) => {
        if (err) res.send({message: 'something failed', error: err});
        res.send(result);
    });
}




function findOne(req, res) {
    const id = req.params.id;
    tripModel.findTripById(id)
    .then(result => {res.send(result); // responde al resolve
    })
    .catch(err => { // responde al reject
        res.send({message:'something failed', error: err});
    })
    
}

function deleteOne(req, res) {
    const id = req.params.id;
    const trip = tripModel.deleteTripById(id);
    res.send(trip);
}



function update(req,res){

}


module.exports = {
    findAll,
    findOne,
    deleteOne,
    update
};