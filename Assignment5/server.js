var express = require("express");
var app = express();
var c;
var w=0;
var l=0;

app.use(express.static("."));
var bodyParser=require("body-parser");
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "app.html" );
});

app.post('/flip', function (req, res) {
     var c = Math.random();
     if ("head_s" == req.body.call && c > 0.5 ){
         w=+1;
         res.send(JSON.stringify({ "result": "win" }));
     }
    
     else if ("tail_s" == req.body.call && c < 0.5 ){
        w =+1; 
       res.send(JSON.stringify({ "result": "win" }));
          }
      else {
           l=+1;
            res.send(JSON.stringify({ "result": "loss" }));
        }     
});

app.get('/stats', function (req, res) {
res.send(JSON.stringify({ "wins": w,"losses": l}));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});




