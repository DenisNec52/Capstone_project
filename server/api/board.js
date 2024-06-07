const router = require('express').Router();
const Pin = require('../models/pin');
const User = require('../models/user');

// Route di test
router.get('/', (req, res, next) => {
  res.send('test board route');
});

// Crea una nuova bacheca per l'utente
router.post('/', (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $addToSet: {
        boards: {
          title: req.body.title,
          description: req.body.description,
        },
      },
    },
    { new: true }
  )
    .then(createdBoard => res.json(createdBoard))
    .catch(next);
});

// Ottiene una bacheca specifica per ID e popola i suoi pin
router.get('/pin/:boardId', (req, res, next) => {
  const { boardId } = req.params;
  
  User.findOne({ 'boards._id': boardId }, { 'boards.$': 1 })
    .populate({
      path: 'boards.pins',
      populate: { path: 'author', select: 'username' }
    })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return res.status(404).json({ message: 'Board not found' });
      res.json(user.boards[0]);
    });
});

// Ottiene tutte le bacheche di un utente specifico
router.get('/:user', (req, res, next) => {
  const { user } = req.params;
  
  User.findOne({ username: user })
    .then(foundUser => {
      if (!foundUser) return res.status(404).json({ message: 'User not found' });
      res.json({ boards: foundUser.boards, user: foundUser.username });
    })
    .catch(next);
});

module.exports = router;
