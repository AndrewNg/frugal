var express = require('express');
var exec = require('exec');
var app = express();
var bodyParser = require('body-parser');
var client = require('twilio')('ACf790f48ac9a0c4a1cb5e5548945e0889', '8be80276be5dd74cf822b080068b1fd4');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/frugal');

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

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

  res.send("<script>window.close()</script>");
});

app.get('/savings', function(req, res) {
    var db = req.db;
    var collection = db.get('charges');
    collection.find({},{},function(e,docs){
        res.send('savings', {
            "savings" : docs
        });
    });
});

app.post('/pay', function(req, res) {
  client.sendMessage({
    to: '+1' + 7327663590,
    from: '+17328100203',
    body: 'You have paid $' + req.body.savings + ' in savings.'
  }, function(err, responseData) {
    if (!err) {
      // log errors
    }
  });

  var db = req.db;
  var collection = db.get('charges');

  collection.insert({
    savings: req.body.savings
  }, function (err, doc) {
    if (err) {
            console.log("sad");
          }
          else {
            console.log("yay");
          }
        });

  pay(accessToken, req.body.savings, "Saving money with Frugal");

  res.send(req.body);
});

app.listen(3000);