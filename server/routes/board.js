const router = require('express').Router();
const User = require('../models/user');

// Test route
router.get('/', (req, res) => {
  res.send('Test board route');
});

// Create a new board for the user
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

// Get a specific board by its ID and populate its pins
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

// Get all boards for a specific user
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
