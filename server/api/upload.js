const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurazione di Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurazione dello storage per l'upload su Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'brian-pinterest-clone', // Nome della cartella su Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png'], // Formati di file consentiti
  },
});

// Middleware per l'upload dei file
const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800 }, // Limite della dimensione del file (50MB)
});

// Route per l'upload di un'immagine
router.post('/', upload.single('photo'), (req, res) => {
  if (req.file) {
    // Se l'upload ha avuto successo, restituisce l'URL dell'immagine
    res.json({
      status: 'success',
      url: req.file.path,
    });
  } else {
    // Se l'upload ha fallito, restituisce un messaggio di errore
    res.status(400).send('Upload failed');
  }
});

module.exports = router;
