var express = require('express');
var exec = require('exec');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));

var accessToken;

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

var pay = function(accessToken, amount, note){
  var curlString = 'curl https://api.venmo.com/v1/payments -d access_token=' + accessToken + ' -d email="francis@chesscademy.com" -d amount=' + amount + ' -d note="' + note + '"';
  var child = exec(curlString, function(error, stdout, stderr){
    console.log(curlString);
    if(error){
      console.log('Error: ' + error);
    }
  });
};

app.get('/', function(req, res){
  accessToken = (req.get('host') + req.originalUrl).substring(29);
  console.log(accessToken);

  res.send("hello world");
});

app.post('/pay', function(req, res) {
  console.log(req);
  console.log('body: ' + JSON.stringify(req.body));
  res.send(req.body);
  pay(accessToken, req.body.savings, "Saving money with Frugal")
});

app.listen(3000);