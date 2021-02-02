// Require packages and set the port
const express = require('express');
const port = 8080;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
<<<<<<< Updated upstream
=======

app.use(express.static(path.join(__dirname, "./views")))
/*
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'))
})
*/
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name, usersEjs: null })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
   res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, async (req, res) => {
  res.render('register.ejs', { usersEjs: null })
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/cabinet/home',
  failureRedirect: '/login',
  failureFlash: true
}
))

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save(function(err){
      if(err) {
        console.log(err);
        return res.send('Such user already exist!');
      }
      req.login(user, function(err) {
        if (err) { return console.log(err); }
        res.redirect('/cabinet/home')
        return console.log('you in');
      });
      return console.log("Сохранен объект", user);
    });
  } catch {
    res.redirect('/register');
  }
})

app.get('/user', checkAuthenticated, (req, res) => {
  console.log(req.session.passport.user)
  User.findOne({ "_id": req.session.passport.user }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.send(docs);
  })
})

app.get('/users', (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.send(docs);
  })
})

app.get('/post', checkAuthenticated, (req, res) => {
  res.render('post.ejs');
})

app.post('/post', checkAuthenticated, async (req, res) => {
  try {
    const interaction = new Interaction ({
      user: req.session.passport.user || 'test',
      number: req.body.number || 1,
      work: req.body.work,
      contractor: req.body.contractor,
      cost: req.body.cost,
      income: (req.body.income === 'on') ? true : false,
      regular: (req.body.regular === 'on') ? true : false,
    });
    await interaction.save(function(err){
  
      if(err) return console.log(err);
      return console.log("Сохранен объект", interaction);
  });
    //res.redirect('/posts');
    //res.end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);  
  }
})
/*
app.get('./contractor', checkAuthenticated, (req, res) => {
  //res.render('contractor.ejs');
})
*/
app.post('/contractor', checkAuthenticated, async (req, res) => {
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

app.get('/posts', checkAuthenticated, async (req, res) => {
  try {
    console.log(req.session.passport.user)
    const data = await Interaction.find({ "user": req.session.passport.user }).populate().exec();
    console.log(data)
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  console.log(req.isAuthenticated())
  res.send({ param: 111 });
  // res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // return res.redirect('/')
  }
  next()
}

mongoose.set('useCreateIndex', true);

const uri = "mongodb+srv://user_34:b5rPniU429Qd8d3n@cluster0.xpo9w.mongodb.net/<dbname>?retryWrites=true&w=majority";
//const uri = 'mongodb://localhost/test';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
app.listen(port);
>>>>>>> Stashed changes
