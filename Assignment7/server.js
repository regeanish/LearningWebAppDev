
"use strict"
  /*var express = require("express");
  var app = express();
  app.use(express.static("."));
  var bodyParser=require("body-parser");
  app.use(bodyParser.json());
  //lets require/import the mongodb native drivers.
  var mongodb = require('mongodb');
  //We need to work with "MongoClient" interface in order to connect to a mongodb server.
  var MongoClient = require("mongodb").MongoClient;
  // Connection URL. This is where your mongodb server is running.
  var url = 'mongodb://localhost:27017/test';
  // Use connect method to connect to the Server.*/

  var express = require("express"),
  MongoClient = require("mongodb").MongoClient,
  bodyParser = require("body-parser"),
  port = 3000;
  var app = express();
  app.use(express.static("."));

  var path = require("path");
  var dbURL = "mongodb://localhost:27017/test";
  app.use(bodyParser.json());
  //app.use(express.static(path.join(__dirname, 'public')));



  app.get("/", function(req,res){
    res.send("Hello World");
  });


  app.post("/links", function(req, res) {
    console.log(req.body, req.body.link);

    MongoClient.connect(dbURL, function(err, db) {
      if (err) {
        console.log("Error connecting to the database");
        res.status(404).send("Error connecting to the database");
      } else {
        console.log("Connected to localohost");
        var collection = db.collection('data');
        var clicks=0;
        collection.insert( { "title" : req.body.title ,"link": req.body.link, "click": clicks } )
        console.log('data is stored in DB');
        res.send({ "title" : req.body.title ,"link": req.body.link, "click": clicks });
              //Close connection.
              db.close();
            }
          });

  });


  app.get("/links", function(req, res) {
    MongoClient.connect(dbURL, function(err, db) {
      if (err) {
        console.log("Error connecting to the database");
        res.status(404).send("Error connecting to the database");
      } else {
        console.log("Connected to localohost");
        var collection = db.collection('data');
        collection.find().toArray(function (err, result) {
          if (err) {
            console.log(err);
          } else if (result.length) {
            console.log('Found:', result);
            res.send(result);
          } else {
            console.log('No document(s) found with defined "find" criteria!');
          }
              //console.log(a)
              // do some work here with the database.
              //Close connection
              db.close();
            });
      }
    });

  });



  app.get("/click/:title", function(req, res) {
    MongoClient.connect(dbURL, function(err, db) {
      if (err) {
        console.log("Error connecting to the database");
        res.status(404).send("Error connecting to the database");
      } else {
        console.log("Connected to localohost");
          //var collection = db.collection('data');
          //var abc = collection.find();
          
          var title1= req.params.title;
           var collection = db.collection('data');
          collection.findAndModify(
           
           { title: title1 },[],

           {$inc :{ click: 1 }}, { new : true},

           function(error,response){
            if (error) {
              console.log(error);
            }
              else { 
                console.log(response);
                db.close();
            res.redirect(response.value.link);
          

              }
            
            

              //Close connection
        });
      }

  });
 });




  app.listen(port);
  console.log("Listening on port " + port);
