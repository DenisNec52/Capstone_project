import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { info } from './utils/logger.js';

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
