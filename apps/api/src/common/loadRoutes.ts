import * as R from 'remeda';
import { Router } from 'express';
import { wrapExpress } from './wrapExpress';
import { BadRequestError, ForbiddenError, UnauthorizedError } from './errors';
import { logger } from './logger';
import { Handler } from '../types';
import { AccessTokenCollection } from '../collections/AccessToken';
import { UserCollection } from '../collections/User';
import { getBindings } from './bindings';

export default function loadRoutes(router: Router) {
  const bindings = getBindings('rpc');
  bindings.forEach(options => {
    const actions: Handler[] = [
      async (req, res, next) => {
        const token = req.header('x-token');
        if (!token) {
          return next();
        }
        try {
          const tokenEntity = await AccessTokenCollection.findOne({
            _id: token,
          });
          if (!tokenEntity) {
            return next(new UnauthorizedError('invalid token'));
          }
          const user = await UserCollection.findByIdOrThrow(tokenEntity.userId);
          req.user = {
            _id: user._id,
            email: user.email,
            isVerified: user.isVerified,
          };
          next();
        } catch (e) {
          next(e);
        }
      },
      (req, res, next) => {
        if (options.public) {
          next();
          return;
        }
        if (!req.user) {
          next(new UnauthorizedError('Bearer token required'));
          return;
        }
        if (!req.user.isAdmin && options.admin) {
          next(new ForbiddenError('Admin only'));
          return;
        }
        next();
      },
    ];
    if (process.env.NODE_ENV !== 'test') {
      logger.info(
        `${options.public ? '[Public]' : '[Auth]'} ${options.signature}`
      );
    }
    actions.push((req, res, next) => {
      if (req.body == null) {
        req.body = {};
      } else if (typeof req.body !== 'object') {
        next(new BadRequestError('Body must be an object'));
        return;
      }
      if (options.wrapAsValues) {
        req.body = {
          values: req.body,
        };
      }
      const params = options.handler.getParams();
      if (options.injectUser) {
        params.shift();
      }
      const diff = R.difference(Object.keys(req.body), params);
      if (diff.length) {
        next(
          new BadRequestError(
            'Following params are not allowed: ' + diff.join(', ')
          )
        );
        return;
      }
      const values = params.map(x => req.body[x]);
      if (options.injectUser) {
        values.unshift(req.user);
      }
      Promise.resolve(options.handler(...values))
        .then(ret => {
          if (ret === 'TRUE' || ret === 'FALSE') {
            res.send(ret);
          } else {
            res.json(ret);
          }
        })
        .catch(next);
    });
    router.post('/' + options.signature, wrapExpress(actions) as any);
  });
}
