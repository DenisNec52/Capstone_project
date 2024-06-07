const router = require('express').Router();
const User = require('../models/user');

// Route per la registrazione di un nuovo utente
router.post('/signup', (req, res, next) => {
  const newUser = new User({ email: req.body.email, username: req.body.username, name: req.body.name });

  // Genera l'hash della password e salva il nuovo utente nel database
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save()
    .then((createdUser) => {
      // Effettua il login del nuovo utente dopo la registrazione
      req.login(createdUser, err => (err ? next(err) : res.json({ username: createdUser.username })));
    })
    .catch((err) => {
      // Gestisce gli errori durante la registrazione
      if (err.name === 'ValidationError') res.status(401).send('User already exists');
      else {
        next(err);
      }
    });
});

// Route per il login di un utente esistente
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Verifica se l'utente esiste e se la password è corretta
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.validPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        // Effettua il login dell'utente
        req.login(user, err => (err ? next(err) : res.json({ username: user.username })));
      }
    })
    .catch(next);
});

// Route per il logout
router.post('/logout', (req, res) => {
  // Effettua il logout e reindirizza alla home page
  req.logout();
  res.redirect('/');
});

// Route per ottenere le informazioni dell'utente autenticato
router.get('/me', (req, res) => {
  // Restituisce le informazioni dell'utente autenticato
  res.json({ username: req.user.username });
});

module.exports = router;
