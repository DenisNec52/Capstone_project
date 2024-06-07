const router = require('express').Router();
const Pin = require('../models/pin');
const User = require('../models/user');

// Ottiene tutti i pin di un utente specifico
router.get('/:userId', (req, res, next) => {
  const user = req.params.userId;
  Pin.find({ author: user })
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

// Ottiene tutti i pin per la homepage
router.get('/', (req, res, next) => {
  Pin.find()
    .populate({ path: 'author', select: 'username' })
    .then(pinsForUser => res.json(pinsForUser))
    .catch(next);
});

// Crea un nuovo pin per l'utente autenticato
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
    }) // Aggiunge il riferimento del pin al modello utente
    .then(createdPin => User.updateOne({ _id: createdPin.author, 'boards.title': board }, { $addToSet: { 'boards.$.pins': createdPin._id } }))
    .then((success) => {
      success.pin = dataToSend;
      success.user = req.user.username;
      res.json(success);
    })
    .catch(next);
});

// Salva un pin per l'utente autenticato
router.put('/:pinId', (req, res, next) => {
  const pin = req.params.pinId;
  const board = req.body.board;
  Pin.findById(pin)
    .then(updatedPin => User.updateOne({ _id: req.user._id, 'boards.title': board }, { $addToSet: { 'boards.$.pins': updatedPin._id } }))
    .then(updateMessage => res.json(updateMessage))
    .catch(next);
});

// Elimina un pin
router.delete('/:pinId', (req, res, next) => {
  const pin = req.params.pinId;
  Pin.deleteOne({ _id: pin })
    .then(() => res.json({ message: 'Pin deleted successfully' }))
    .catch(next);
});

module.exports = router;
