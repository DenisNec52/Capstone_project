const router = require('express').Router();
const Pin = require('../models/pin');
const User = require('../models/user');

router.get('/:userId', (req, res, next) => {
  const user = req.params.userId;
  Pin.find({ author: user })
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

router.get('/', (req, res, next) => {
  Pin.find()
    .populate({ path: 'author', select: 'username' })
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const board = req.body.board;
  let dataToSend;
  const newPin = new Pin({
    image: req.body.image,
    description: req.body.description,
    author: req.user._id,
    tags: req.body.tags,
  });

  newPin.save()
    .then((savedPin) => {
      dataToSend = savedPin;
      return savedPin;
    })
    .then(createdPin => User.update({ _id: createdPin.author, 'boards.title': board }, { $addToSet: { 'boards.$.pins': createdPin._id } }))
    .then((success) => {
      success.pin = dataToSend;
      success.user = req.user.username;
      res.json(success);
    })
    .catch(next);
});

router.put('/:pinId', (req, res, next) => {
  const pin = req.params.pinId;
  const board = req.body.board;
  Pin.findById(pin)
    .then(updatedPin => User.update({ _id: req.user._id, 'boards.title': board }, { $addToSet: { 'boards.$.pins': updatedPin._id } }))
    .then(updateMessage => res.json(updateMessage))
    .catch(next);
});

router.delete('/:pinId', (req, res, next) => {
  const pin = req.params.pinId;
  Pin.deleteOne({ _id: pin })
    .then(() => res.status(204).end())
    .catch(next);
});

module.exports = router;
