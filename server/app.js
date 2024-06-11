import express from 'express';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import usersRouter from './controllers/users.js';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js';
import { info, error as logError } from './utils/logger.js';
import mongoose from 'mongoose';
import configurePassport from './utils/passport.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();  // Carica le variabili d'ambiente dal file .env

const app = express();

// Connessione al database MongoDB
info("connecting to", process.env.MONGODB_URI);
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    logError("error connecting to MongoDB:", err.message);
  });

// Middleware
app.use(cors());  // Abilita il CORS per le richieste cross-origin
app.use(express.json());  // Parser per le richieste JSON
app.use(express.urlencoded({ extended: true }));  // Parser per le richieste URL-encoded

// Configurazione della sessione
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',  // Chiave segreta per le sessioni
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());  // Inizializza Passport.js
app.use(passport.session());  // Permette a Passport.js di gestire le sessioni
configurePassport(passport);  // Configura le strategie di Passport.js

app.use(requestLogger);  // Middleware per il logging delle richieste

app.use("/api/users", usersRouter);  // Router per le API degli utenti

// Rotte per l'autenticazione con Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], response_type: 'code' }));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false,
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`/?token=${token}`);
});

// Serve i file statici in produzione
if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve('client', 'build');
  app.use(express.static(buildPath));
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurazione dello storage per Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

// Route per l'upload dell'immagine del profilo
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (req.file && req.file.path) {
    return res.status(200).json({ url: req.file.path });
  }
  return res.status(400).json({ error: 'Image upload failed' });
});

app.use('/api/users', usersRouter);
// Gestione degli endpoint sconosciuti e degli errori
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
