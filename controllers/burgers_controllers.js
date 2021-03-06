var express = require("express");

var burger = require("../models/burger.js");

var app = express();

app.get("/", function(req, res) {
  burger.selcAll(function(data) {
    var allBurgs = {
      burgers: data
    };
    console.log(allBurgs);
    res.render("index", allBurgs);
  });
});

app.get("/api/burgers", function(req, res) {
  burger.selcAll(function(data) {
    var allBurgs = {
      burgers: data
    };
    console.log(allBurgs);
    res.json(data);
  });
});

app.post("/api/burgers", function(req, res) {
  burger.createBurg([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

app.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

app.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//being exported to server.js
module.exports = app;