const http = require('http');

http
  .createServer((req, res) => {
    res.setHeader('content-type', 'application/json');
    if (req.url.endsWith('/slow')) {
      for (let i = 0; i < 10_0000_000; i++) {}
      res.write(JSON.stringify({ foo: '##' }, null, 2));
      res.end();
    } else {
      setTimeout(() => {
        res.write(JSON.stringify({ foo: '!!' }, null, 2));
        res.end();
      }, 1000);
    }
  })
  .listen(4100, () => {
    console.log('listening on 4100');
  });
