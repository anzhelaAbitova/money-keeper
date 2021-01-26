const express = require('express');
const User = require('./models').User;
const loginCrud = express.Router();

loginCrud.get('/', function(req, res){
    console.log('getting all user');
    User.find({}).exec(function(err, user){
        try {
            res.json(user);
        } catch (err) {
            res.send('error has occured');
            console.log(user);
        }
    });
});

loginCrud.get('/:id', function(req, res){
    console.log('getting one user');
    User.findOne({
        _id: req.params.id
    }).exec(function(err, user){
        try {
            res.json(user);
        } catch (err) {
            res.send('error has occured');
            console.log(err);
        }
    });
});

loginCrud.post('/', function(req, res){
    const user = new user();
    user.name = req.body.name;
    user.cost = req.body.cost;
    user.regular = req.body.regular;
    user.save(function(err, user){
        try {
            res.send(user);
        } catch (err) {
            res.send('error saving user');
            console.log(err);
        }
    });
});

loginCrud.put('/:id', function(req, res){
    User.findOneAndUpdate({
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
    },function(err, user){
        try {
            res.send(user);
        } catch (err) {
            res.send('error updating user');
            console.log(err);
        }
    });
});

loginCrud.delete('/:id', function(req, res){
    User.findByIdAndRemove({
        _id: req.params.id
    },function(err, user){
        try {
            res.send(user);
        } catch (err) {
            res.send('error deleting user');
            console.log(err);
        }
    });
});

module.exports = loginCrud;