import http from 'http';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';
import { initSocket, setIo } from './src/sockets/index.js';

async function start() {
  await connectDB();

  const httpServer = http.createServer(app);
  const io = initSocket(httpServer);
  setIo(io);

  httpServer.listen(env.port, () => {
    console.log(`[server] Running in ${env.nodeEnv} mode on port ${env.port}`);
  });
}

start();