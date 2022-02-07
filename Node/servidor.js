// Sin express
// const http = require('http');
// const colors = require('colors');

// const handleServer = (req, res) => {
//   res.writeHead(200, { 'Content-type': 'text/html'});
//   res.write('<h1>Hola Mundo</h1>');
//   res.end();
// };

// const server = http.createServer(handleServer);

// server.listen(3000, () => {
//   console.log('server on port 3000'.yellow);
// });

// Con express
const express = require('express');
const colors = require('colors');
const server = express();

server.use(express.json);

server.all('/user', (req, res, next) => {
  res.send('finished');
  next();
})

server.get('/user', function (req, res) {
  res.json({
    name: 'Miguel',
    lastName: 'Hernandez'
  });
  res.end;
})

server.post('/user/:id', function (req, res) {
  console.log(req.body);
  console.log(req.params);
  res.send('recibido');
  res.end;
})

server.put('/user/:id', function (req, res) {
  console.log(req.body)
  res.send(`User ${req.params.id} updated`);
  res.end;
})

server.delete('/user/:id', function (req, res) {
  res.send(`User ${req.params.id} deleted`);
  res.end;
})

server.listen(3000, () => {
  console.log('Server on port 3000'.red);
});

