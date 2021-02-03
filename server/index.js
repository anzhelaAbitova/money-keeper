<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204, // 200 For legacy browser support
}

const app = express();

// Middle ware
app.use(bodyParser.json());
app.use(cors(corsOptions));

const users = require('./routes/api/users');

app.use('/api/users/', users);

// Handle production
if (process.env.NODE_ENV === 'production') {

  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start on port ${port}`));

app.on('error', function (err) {
  console.error(err); // or whatever logger you want to use
});



// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// }

// const express = require('express')
// const app = express()
// const MongoClient = require('mongodb').MongoClient;

// let user;
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const flash = require('express-flash');
// const methodOverride = require('method-override');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);
// const connect = require('./mongoConnection');
// const User = require('./models/models').User;
// const Interaction = require('./models/models').Interaction;
// const Contractor = require('./models/models').Contractor;
// const interactionCrud = require('./crudRoutes/interactionCrud');
// const router = require('./routes/routes')
// const host = '127.0.0.1'
// const port = process.env.PORT || 3000;

// const users = [];

// const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   async email => await User.findOne({ email: email }),
//   async id => await User.findOne({ id: id }),
// )

// // app.set('view-engine', 'ejs')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(flash())
// app.use(cors())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie : {
//     maxAge:(2629743),
//     secure: false,
//   },
//   store            : new MongoStore({
//     mongooseConnection: mongoose.connection,
//     host         : process.env.DB_HOST,
//     port         : process.env.DB_PORT,
//     db           : process.env.DB_NAME,
//     autoReconnect: true,
//     ssl          : false
//   }),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie : {
//     maxAge:(1000 * 60 * 100)
//   }  
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))
// /*
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");

//   next();
// });
// */
// app.use(async (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

// app.get('/', checkAuthenticated, (req, res) => {
//   res.render('index.ejs', { name: req.user.name, usersEjs: null })
//   //res.send('tes express nodejs mongodb');
// })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('login.ejs')
// })

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, async (req, res) => {
//   res.render('register.ejs', { usersEjs: null })
// })

// app.post('/register', checkNotAuthenticated, async (req, res, next) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     user = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     await user.save();
//     users.push(user);
//     req.login(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/');
//     });
//     console.log(user);
//     next();
//   } catch {
//     res.redirect('/register');
//   }
// })

// app.get('/users', checkAuthenticated, (req, res) => {
//   User.find(function (err, docs) {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     res.send(docs);
//   })
// })

// app.get('/post', checkAuthenticated, (req, res) => {
//   console.log(req)
//   res.render('post.ejs');
// })

// app.post('/post', checkAuthenticated, async (req, res) => {
//   try {
//     const interaction = new Interaction ({
//       user: req.session.passport.user || 'test',
//       number: req.body.number,
//       work: req.body.work,
//       contractor: req.body.contractor,
//       cost: req.body.cost,
//       regular: (req.body.regular === 'on') ? true : false,
//     })
//     await interaction.save(function(err){
  
//       if(err) return console.log(err);
//       console.log("Сохранен объект", interaction);
//   });
//     res.redirect('/posts');
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);  }
// })

// app.get('./contractor', checkAuthenticated, (req, res) => {
//   res.render('contractor.ejs');
// })

// app.post('/contractor', checkAuthenticated, async (req, res) => {
//   try {
//     const contractor = new Contractor ({
//       name: req.body.name,
//       works: req.body.work || 'test',
//       regular: (req.body.regular === 'on') ? true : false,
//     })
//     await contractor.save(function(err){
  
//       if(err) return console.log(err);
//       console.log("Сохранен объект", contractor);
//   });
//     res.redirect('/posts');
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);  }
// })
=======
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
const redisStorage = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();

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
  store: new redisStorage({
    host: host,
    port: 3000,
    client: client,
    ttl: 3600000,
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
>>>>>>> develop

// app.get('/posts', (req, res) => {
//   Interaction.find(function (err, docs) {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//     res.send(docs);
//   })
// })

<<<<<<< HEAD
// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   console.log(req.isAuthenticated())
//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }

// mongoose.set('useCreateIndex', true);

// //const uli = "mongodb+srv://user_34:b5rPniU429Qd8d3n@cluster0.xpo9w.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const url = 'mongodb+srv://rsapp:nraD5pDkdxh6h4u5@beinweb.orshp.mongodb.net/RSApp?retryWrites=true&w=majority';
// // const uli = 'mongodb://localhost/test';
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });
// app.listen(port);
=======
MongoClient.connect('mongodb://localhost:27017', function (err, database) {
  if (err) {
    return console.log(err);
  }
  dbUsers = database.db('users');
  app.listen(3000);
})
>>>>>>> develop
