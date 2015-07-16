'use strict';
var express = require('express'),
    bodyParser = require('body-parser');

var app = express(),
    accounts = {
        '1': {
            userId: 1,
            username: 'john_smith',
            email: 'john.smith@gmail.com',
            height: 1.74            
        }
    };

app.use(bodyParser());

app.get('/account/:userId', function (req, res) {
    var userId = req.params.userId;
    
    if (accounts[userId]) {
        res.send(accounts[userId]);
    } else {
        res.sendStatus(404);
    }    
});

app.put('/account/:userId', function (req, res) {
    var userId = req.params.userId;
    
    accounts[userId] = req.body;
    res.sendStatus(200);
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Backend listening at http://%s:%s', host, port);
});