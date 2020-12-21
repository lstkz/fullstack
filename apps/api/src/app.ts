import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { logger } from './common/logger';
import { connect, createCollections } from './db';
import { domainMiddleware } from './middlewares/domainMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { notFoundHandlerMiddleware } from './middlewares/notFoundHandlerMiddleware';
import loadRoutes from './common/loadRoutes';
import { config } from 'config';
import { ampq } from './lib';
import { reportError } from './common/bugsnag';
import { startSockets } from './socket';

const app = express();
const server = http.createServer(app);
startSockets(server);

Promise.all([connect(), ampq.connect(['publish', 'socket'])])
  .then(async () => {
    await createCollections();
    app.use(domainMiddleware);
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    app.get('/', (req, res) => {
      res.send('Fullstack API 💪');
      res.end();
    });
    const apiRouter = express.Router();
    loadRoutes(apiRouter);
    app.use('/rpc', apiRouter);
    app.use(errorHandlerMiddleware);
    app.use(notFoundHandlerMiddleware);
    server.listen(config.api.port, '0.0.0.0', () => {
      logger.info(
        `Express HTTP server listening on port ${config.api.port} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch(e => {
    reportError({
      error: e,
      source: 'api',
      data: {
        info: 'Error when starting an api',
      },
    });
    process.exit(1);
  });
