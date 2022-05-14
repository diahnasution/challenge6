
require('dotenv').config();

const express = require('express');
const app = express();
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const { user_game } = require('./models');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
require('./passport-config');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/view/usergames');
  }
  next();
}

const router = require('./routes');
app.use(router);

router.get('/view/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/view/usergames',
    failureRedirect: '/view/login',
    failureFlash: true,
  })
);

app.get('/', (req, res) => {
  res.redirect('/view/login');
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/view/login');
});


app.all('*', (req, res) => {
  res.redirect('/view/login');
});

module.exports = app;
