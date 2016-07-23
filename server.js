// Request header parser microservice

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var languageInfo = req.headers["accept-language"];
  var commaIndex = languageInfo.indexOf(",");
  var language = languageInfo.substr(0, commaIndex);
  var userAgent = req.headers['user-agent'];
  var indexOpenParen = userAgent.indexOf("(");
  var indexCloseParen = userAgent.indexOf(")");
  var os = userAgent.slice(indexOpenParen+1, indexCloseParen);
  
  res.send(JSON.stringify( { ipaddress: ip, language: language, software: os }));
  
});


app.listen(port, function () {
  console.log('App is running on port ' + port);
});