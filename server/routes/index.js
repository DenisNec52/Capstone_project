const router = require('express').Router();

router.use('/pin', require('./pin'));
router.use('/board', require('./board'));
router.use('/upload', require('./upload'));
router.use('/users', require('./users')); // aggiunto percorso utente

module.exports = router;
