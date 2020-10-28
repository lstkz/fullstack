const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
  res.json({
    msg: 'it works 2',
  });
});

const port = process.env.PORT || 4000;

http.createServer(app).listen(process.env.PORT || 4000, () => {
  console.log('listening on port', port);
});
