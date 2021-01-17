if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
let db;
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')(session);

const host = '127.0.0.1'
const port = 3000

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
  store            : new MongoStore({
    host         : process.env.DB_HOST,
    port         : process.env.DB_PORT,
    db           : process.env.DB_NAME,
    autoReconnect: true,
    ssl          : false
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge:(1000 * 60 * 100)
  }  
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name, usersEjs: null })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', { usersEjs: null })
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = ({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    users.push(user);
    dbUsers.collection('users').insert(user, function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      return res.send(user);
    });
    res.redirect('/');
  } catch {
    res.redirect('/register');
  }
})

app.get('/users', checkNotAuthenticated, (req, res) => {
  dbUsers.collection('users').find().toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

MongoClient.connect('mongodb://localhost:27017', function (err, database) {
  if (err) {
    return console.log(err);
  }
  dbUsers = database.db('users');
  app.listen(3000);
})