var express = require('express');
var app = express();
var http = require('http');
var request = require('request');
var tabletojson = require('tabletojson');



app.get('/drumuri' , function(req , res){
request('http://213.177.10.50:6060/itn/drumuri.asp', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the body of response.
	
	
	res.type('text/html');
	res.send(body);
  }
})
	
});


app.get('/drumuri/json' , function(req , res){
	
	var url = 'http://213.177.10.50:6060/itn/drumuri.asp';
	tabletojson.convertUrl(url)
.then(function(tablesAsJson) {
    var standardAndPoorRatings = tablesAsJson[0];
    var fitchRatings = tablesAsJson[1];
    res.json(tablesAsJson);
});
	
});

app.get('/afisareDrumuri' , function(req , res){
request('http://213.177.10.50:6060/itn/drumuri.asp', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    
	var tablesAsJson = tabletojson.convert(body);
    
	var evenimenteList = body.slice(body.indexOf('<ul type="DISC">') , body.indexOf('</ul>'));
	
	evenimenteList = evenimenteList.slice(4);
    evenimenteList.replace('<li>' , '');
    evenimenteList.replace('</li><li>' , '<li>');
    evenimenteList.replace('</li>' , '');
    var evenimente = evenimenteList.split('<li>');
	
	tablesAsJson.unshift(evenimente);
	
	
	res.type('text/json');
	res.send(tablesAsJson);
  }
})
	
});



app.listen(process.env.PORT || 4730);