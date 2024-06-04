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

dotenv.config();  // Load environment variables from .env file

const app = express();

info("connecting to", process.env.MONGODB_URI);

// Set strictQuery to true to suppress the warning
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    logError("error connecting to MongoDB:", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',  // Replace with your actual secret key
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use(requestLogger);

app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve('client', 'build');
  app.use(express.static(buildPath));
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
