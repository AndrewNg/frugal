var express = require('express');
var exec = require('exec');
var app = express();

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
  var accessToken = (req.get('host') + req.originalUrl).substring(29);
  console.log(accessToken);

  pay(accessToken, 1, "What's up Francis. I hope this works.");
  res.send("hello world");
});

app.listen(3000);