const http = require('http');
const app = require('./src/app');

const { serverIP, serverPORT } = process.env;
app.set('port', serverPORT);
const server = http.createServer(app);

server.listen(serverPORT, serverIP, () =>
  /* eslint-disable no-console */
  console.log(`Server ON: http://${serverIP}:${serverPORT}/`),
);
