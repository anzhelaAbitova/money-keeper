const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/models').User;
const Interaction = require('../models/models').Interaction;
const Contractor = require('../models/models').Contractor;
const interactionCrud = require('./../crudRoutes/interactionCrud');
  
const host = '127.0.0.1'
const port = process.env.PORT || 3000;
  
  const initializePassport = require('./../passport-config')
  initializePassport(
    passport,
    async email => await User.findOne({ email: email }),
    async id => await User.findOne({ id: id }),
  )
  
  router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name, usersEjs: null })
  })
  
  router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  
  router.get('/register', checkNotAuthenticated, async (req, res) => {
    res.render('register.ejs', { usersEjs: null })
  })
  
  router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })
      await user.save();
      users.push(user);
      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    } catch {
      res.redirect('/register');
    }
  })
  
  router.get('/users', checkAuthenticated, (req, res) => {
    User.find(function (err, docs) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  })
  
  router.get('/post', checkAuthenticated, (req, res) => {
    console.log(req)
    res.render('post.ejs');
  })
  
  router.post('/post', checkAuthenticated, async (req, res) => {
    try {
      const interaction = new Interaction ({
        user: req.session.passport.user || 'test',
        number: req.body.number,
        work: req.body.work,
        contractor: req.body.contractor,
        cost: req.body.cost,
        regular: (req.body.regular === 'on') ? true : false,
      })
      await interaction.save(function(err){
    
        if(err) return console.log(err);
        console.log("Сохранен объект", interaction);
    });
      res.redirect('/posts');
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);  }
  })
  
  router.get('./contractor', checkAuthenticated, (req, res) => {
    res.render('contractor.ejs');
  })
  
  router.post('/contractor', checkAuthenticated, async (req, res) => {
    try {
      const contractor = new Contractor ({
        name: req.body.name,
        works: req.body.work || 'test',
        regular: (req.body.regular === 'on') ? true : false,
      })
      await contractor.save(function(err){
    
        if(err) return console.log(err);
        console.log("Сохранен объект", contractor);
    });
      res.redirect('/posts');
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);  }
  })
  
  router.get('/posts', checkAuthenticated, (req, res) => {
    Interaction.find(function (err, docs) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  })
  
  router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    console.log(req.isAuthenticated())
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

// Export the router
module.exports = router;
