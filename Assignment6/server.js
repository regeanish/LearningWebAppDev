"use strict";
var express = require("express");
var redis = require('redis');
var client = redis.createClient();
var app = express();
var c;
var w = 0;
var l = 0;

var wins = 0;
var losses = 0;

client.on('connect', function() {
    console.log('connected');
});


app.use(express.static("."));
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "app.html");
});



app.post('/flip', function(req, res) {
    var c = Math.random();
    if ("head_s" == req.body.call && c > 0.5) {
        w++;

        client.incr('wins', function(err, reply) {
            console.log(reply);
            console.log(' wins are stored ');

        });
        console.log(w);
        res.send(JSON.stringify({
            "result": "win"
        }));
    } else if ("tail_s" == req.body.call && c < 0.5) {
        w++;
        client.incr('wins', function(err, reply) {
            console.log(reply);
            console.log(' wins are stored ');

        });
        res.send(JSON.stringify({
            "result": "win"
        }));
    } else {
        l++;

        client.incr('losses', function(err, reply) {
            console.log(reply);
            console.log(' losses are stored ');
            res.send(JSON.stringify({
                "result": "loss"
            }));

        });
    }

});

app.get('/stats', function(req, res) {

    client.get('wins', function(err, reply) {
        if (reply) {
            console.log(reply);
            w = reply;
        }




        client.get('losses', function(err, reply) {
            if (reply) {
                console.log(reply);
                l = reply;
            }

            var status = JSON.stringify({
                wins: w,
                losses: l
            });
            res.send(status);
        });
    });


});

app.delete('/stats', function(req, res) {
    client.set('wins', '0', function(err, reply) {
        console.log(reply);
    });
    client.set('losses', '0', function(err, reply) {
        console.log(reply);
    });

    result = JSON.stringify({
        reset: "successfull"
    });
    res.send(result);

});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});