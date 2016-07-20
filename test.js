var express = require('express'),
var  http = require('http'),
    app = http.createServer();

    app.get('/', function(req, res){
    res.send('Hello World');
});

  app.listen();
console.log('Express server started on port %s', app.address().port);