import { Handler } from 'express';
import fetch from 'node-fetch';

const MIXPANEL_API_URL = 'https://api-eu.mixpanel.com';

export const trackMiddleware: Handler[] = [
  async (req, res, next) => {
    (req as any).rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
      (req as any).rawBody += chunk;
    });

    req.on('end', function () {
      next();
    });
  },
  async (req, res, next) => {
    try {
      if (!req.url.startsWith('/track/')) {
        next();
        return;
      }
      const headers = {
        ...req.headers,
        'X-Forwarded-For': req.ip,
      };
      delete headers.host;
      const mixPanelRes = await fetch(
        `${MIXPANEL_API_URL}/${req.url.replace(/^\/track\//, '')}`,
        {
          method: req.method,
          body: req.method === 'GET' ? undefined : (req as any).rawBody,
        }
      );
      res.status(mixPanelRes.status);
      mixPanelRes.headers.forEach((value, name) => {
        if (!name.startsWith('access-control-allow-')) {
          res.setHeader(name, value);
        }
      });
      const text = await mixPanelRes.text();
      res.write(text);
      res.end();
    } catch (e) {
      next(e);
    }
  },
];
