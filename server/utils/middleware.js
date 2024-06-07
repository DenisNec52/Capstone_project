import { info, error as logError } from './logger.js';

// Middleware per il logging delle richieste
const requestLogger = (request, response, next) => {
  info("Date:  ", new Date().toLocaleString());
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};

// Middleware per gestire endpoint sconosciuti
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware per gestire gli errori
const errorHandler = (error, request, response, next) => {
  logError(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

export {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
