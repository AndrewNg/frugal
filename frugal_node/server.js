var express = require('express');
var app = express();

app.get('/', function(req, res){
  var accessToken = (req.get('host') + req.originalUrl).substring(29);
  console.log(accessToken);
  res.send("hello world");
});

app.listen(3000);