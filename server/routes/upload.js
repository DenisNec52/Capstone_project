const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Posts', // Cloudinary folder name
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800 },
});

router.post('/', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json({
      status: 'success',
      url: req.file.path,
    });
  } else {
    res.status(400).send('Upload failed');
  }
});

module.exports = router;
