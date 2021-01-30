const express = require('express');
const Interaction = require('./../models').Interaction;
const interactionCrud = express.Router();

interactionCrud.get('/', function(req, res){
    console.log('getting all interaction');
    Interaction.find({}).exec(function(err, interaction){
        try {
            res.json(interaction);
        } catch (err) {
            res.send('error has occured');
            console.log(interaction);
        }
    });
});

interactionCrud.get('/:id', function(req, res){
    console.log('getting one interaction');
    Interaction.findOne({
        _id: req.params.id
    }).exec(function(err, interaction){
        try {
            res.json(interaction);
        } catch (err) {
            res.send('error has occured');
            console.log(err);
        }
    });
});

interactionCrud.post('/', function(req, res){
    const interaction = new Interaction();
    interaction.name = req.body.name;
    interaction.cost = req.body.cost;
    interaction.regular = req.body.regular;
    interaction.save(function(err, interaction){
        try {
            res.send(interaction);
        } catch (err) {
            res.send('error saving interaction');
            console.log(err);
        }
    });
});

interactionCrud.put('/:id', function(req, res){
    Interaction.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            work: req.body.work,
            cost: req.body.cost,
            regular: (req.body.regular === 'on') ? true : false,
        }
    },{
        new: true,
        upsert: true
    },function(err, interaction){
        try {
            res.send(interaction);
        } catch (err) {
            res.send('error updating interaction');
            console.log(err);
        }
    });
});

interactionCrud.delete('/:id', function(req, res){
    interaction.findByIdAndRemove({
        _id: req.params.id
    },function(err, interaction){
        try {
            res.send(interaction);
        } catch (err) {
            res.send('error deleting interaction');
            console.log(err);
        }
    });
});

module.exports = interactionCrud;