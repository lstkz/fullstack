import { ValidationError } from 'schema';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../common/http-status';
import { ErrorRequestHandler, Request } from 'express';
import { HttpError, AppError } from '../common/errors';
import { logger } from '../common/logger';
import Bugsnag from '@bugsnag/js';
import { ContractError } from 'contract';
import { config } from 'config';

function _getTargetError(e: any) {
  return e.original instanceof Error ? e.original : e;
}

function _isPublicError(e: any) {
  const target = _getTargetError(e);
  return (
    target instanceof AppError ||
    target instanceof ValidationError ||
    target instanceof HttpError ||
    target.expose === true
  );
}

function _getPublicErrorMessage(e: any) {
  const target = _getTargetError(e);
  return target.message;
}

const bugsnagClient =
  config.bugsnag.apiKey === -1
    ? null
    : Bugsnag.start({
        apiKey: config.bugsnag.apiKey,
        plugins: [],
      });

function getRequestInfo(req: Request) {
  const connection = req.connection;
  const url = req.url;
  const request: any = {
    url: url,
    path: req.path || req.url,
    httpMethod: req.method,
    headers: req.headers,
    httpVersion: req.httpVersion,
  };
  request.params = req.params;
  request.query = req.query;
  request.body = req.body;
  request.clientIp =
    req.ip || (connection ? connection.remoteAddress : undefined);
  request.referer = req.headers.referer || req.headers.referrer;

  if (connection) {
    request.connection = {
      remoteAddress: connection.remoteAddress,
      remotePort: connection.remotePort,
      bytesRead: connection.bytesRead,
      bytesWritten: connection.bytesWritten,
    };
  }

  return request;
}

function reportBugsnag(err: Error) {
  if (!bugsnagClient) {
    return;
  }
  const bugsnagEvent = Bugsnag.Event.create(
    err,
    false,
    {
      severity: 'error',
      unhandled: true,
      severityReason: {
        type: 'unhandledErrorMiddleware',
        attributes: {
          framework: 'Express/Connect',
        },
      },
    },
    'express',
    0
  );
  bugsnagEvent.addMetadata('request', getRequestInfo(req as any));
  if (err instanceof ContractError) {
    bugsnagEvent.addMetadata('entries', err.entries);
  }
  bugsnagClient._notify(
    bugsnagEvent,
    () => {},
    err => {
      if (err) {
        logger.error('Failed to send event to Bugsnag');
      }
    }
  );
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  const status = _isPublicError(err)
    ? _getTargetError(err).statusCode || BAD_REQUEST
    : INTERNAL_SERVER_ERROR;
  logger.error(err, `${status} ${req.method} ${req.url}`);
  res.status(status);
  if (_isPublicError(err)) {
    res.json({
      error: _getPublicErrorMessage(err),
      stack:
        process.env.NODE_ENV !== 'production'
          ? err.stack!.split('\n')
          : undefined,
    });
  } else {
    reportBugsnag(err);
    res.json({
      error: 'Internal server error',
    });
  }
};
