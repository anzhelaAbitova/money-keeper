const express = require('express');
const Contractor = require('./models').contractor;
const contractorCrud = express.Router();

contractorCrud.get('/', function(req, res){
    console.log('getting all contractor');
    Contractor.find({}).exec(function(err, contractor){
        try {
            res.json(contractor);
        } catch (err) {
            res.send('error has occured');
            console.log(contractor);
        }
    });
});

contractorCrud.get('/:id', function(req, res){
    console.log('getting one contractor');
    Contractor.findOne({
        _id: req.params.id
    }).exec(function(err, contractor){
        try {
            res.json(contractor);
        } catch (err) {
            res.send('error has occured');
            console.log(err);
        }
    });
});

contractorCrud.post('/', function(req, res){
    const contractor = new contractor();
    contractor.name = req.body.name;
    contractor.cost = req.body.cost;
    contractor.regular = req.body.regular;
    contractor.save(function(err, contractor){
        try {
            res.send(contractor);
        } catch (err) {
            res.send('error saving contractor');
            console.log(err);
        }
    });
});

contractorCrud.put('/:id', function(req, res){
    Contractor.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            name: req.body.name,
            works: req.session.passport.work || 'test',
            regular: (req.body.regular === 'on') ? true : false,
        }
    },{
        new: true,
        upsert: true
    },function(err, contractor){
        try {
            res.send(contractor);
        } catch (err) {
            res.send('error updating contractor');
            console.log(err);
        }
    });
});

contractorCrud.delete('/:id', function(req, res){
    Contractor.findByIdAndRemove({
        _id: req.params.id
    },function(err, contractor){
        try {
            res.send(contractor);
        } catch (err) {
            res.send('error deleting contractor');
            console.log(err);
        }
    });
});

module.exports = contractorCrud;