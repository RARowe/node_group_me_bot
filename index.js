const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const rest = require('restler');
const app = express();

const GROUP_ME_URL = 'https://api.groupme.com/v3/bots/post';
const port = '3000';

app.use(bodyParser.json());

const message = {
  'bot_id' : 'MY_BOT_ID',
};

const getMessage = function (t) {
  return Object.assign({ text: t }, message);
};

const sendMessage = function (t, callback) {
  return rest.postJson(GROUP_ME_URL, getMessage(t));
};

const processBody = function (body) {
  sendMessage('Hello my friend').on('complete', function () {
    console.log('Complete');
  });
};

app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.post('/', function (req, res) {
  var body = req.body;

  if (body.name !== 'Node Test Bot') { processBody(body); }
});

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
