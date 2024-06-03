const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Rotte per signup e login
router.post('/signup', (req, res, next) => {
  const newUser = new User({ email: req.body.email, username: req.body.username, name: req.body.name });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save()
    .then((createdUser) => {
      req.login(createdUser, err => (err ? next(err) : res.json({ username: createdUser.username })));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(401).send('User already exists');
      else {
        next(err);
      }
    });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.validPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => (err ? next(err) : res.json({ username: user.username })));
      }
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json({ username: req.user.username });
});

// Inizia il processo di autenticazione con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Gestisci il callback di Google
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Reindirizza alla homepage dopo l'autenticazione
    res.redirect('/');
  }
);

module.exports = router;
