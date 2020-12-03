import express from 'express';
import Path from 'path';
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

Promise.all([connect(), ampq.connect('publish')])
  .then(async () => {
    await createCollections();
    const app = express();
    app.use(domainMiddleware);
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.json());
    const apiRouter = express.Router();
    loadRoutes(apiRouter);
    app.use('/rpc', apiRouter);
    app.use(express.static(Path.join(__dirname, '../../front/build')));
    app.use(errorHandlerMiddleware);
    app.use(notFoundHandlerMiddleware);
    const server = http.createServer(app);
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
