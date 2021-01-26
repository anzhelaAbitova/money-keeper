if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;

let user;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const connect = require('./mongoConnection');
const User = require('./models').User;
const Interaction = require('./models').Interaction;
const Contractor = require('./models').Contractor;
const interactionCrud = require('./interactionCrud');

const host = '127.0.0.1'
const port = process.env.PORT || 3000;

const users = [];

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  async email => await User.findOne({ email: email }),
  async id => await User.findOne({ id: id }),
)

app.set('view-engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge:(2629743),
    secure: false,
  },
  store            : new MongoStore({
    mongooseConnection: mongoose.connection,
    host         : process.env.DB_HOST,
    port         : process.env.DB_PORT,
    db           : process.env.DB_NAME,
    autoReconnect: true,
    ssl          : false
  }),
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials",true);
  next();
});

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


app.get('/register', checkNotAuthenticated, async (req, res) => {
  res.render('register.ejs', { usersEjs: null })
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    user = new User({
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

app.get('/users', checkAuthenticated, (req, res) => {
  User.find(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
})

app.get('/post', checkAuthenticated, (req, res) => {
  console.log(req)
  res.render('post.ejs');
})

app.post('/post', checkAuthenticated, async (req, res) => {
  try {
    const interaction = new Interaction ({
      user: req.session.passport.user || 'test',
      number: req.body.number,
      work: req.body.work,
      contractor: req.body.contractor,
      cost: req.body.cost,
      regular: (req.body.regular === 'on') ? true : false,
    })
    await interaction.
    save(function(err){
  
      if(err) return console.log(err);
      console.log("Сохранен объект", interaction);
  });
    res.redirect('/posts');
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);  }
})

app.get('./contractor', checkAuthenticated, (req, res) => {
  res.render('contractor.ejs');
})

app.post('/post', checkAuthenticated, async (req, res) => {
  try {
    const contractor = new Interaction ({
      name: req.body.name,
      works: req.session.passport.work || 'test',
      regular: (req.body.regular === 'on') ? true : false,
    })
    await interaction.
    save(function(err){
  
      if(err) return console.log(err);
      console.log("Сохранен объект", interaction);
  });
    res.redirect('/posts');
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);  }
})

app.get('/posts', checkAuthenticated, (req, res) => {
  Interaction.find(function (err, docs) {
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
  console.log(req.isAuthenticated())
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

mongoose.set('useCreateIndex', true);

//const uri = "mongodb+srv://user_34:b5rPniU429Qd8d3n@cluster0.xpo9w.mongodb.net/<dbname>?retryWrites=true&w=majority";
const uri = 'mongodb://localhost/test';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
app.listen(port);
