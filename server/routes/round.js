const express = require("express");


const roundRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
//const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the rounds.
roundRoutes.route("/round").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("rounds")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single round by id
roundRoutes.route("/round/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  db_connect
      .collection("rounds")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new round.
roundRoutes.route("/round/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
      id: req.body.id,
      courseId: req.body.courseId,
      date: req.body.date,
      hcp: req.body.hcp,
      score: req.body.score,
      scoreTyp: req.body.scoreTyp,
      pcc: req.body.pcc,
  };
  db_connect.collection("rounds").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a round by id.
roundRoutes.route("/round/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  let newvalues = {
    $set: {
        id: req.body.id,
        courseId: req.body.courseId,
        date: req.body.date,
        hcp: req.body.hcp,
        score: req.body.score,
        scoreTyp: req.body.scoreTyp,
        pcc: req.body.pcc,
    },
  };
  db_connect
    .collection("rounds")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a round
roundRoutes.route("/round/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  db_connect.collection("rounds").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log('Round with id ' + req.params.id + ' was deleted.');
    response.status(obj);
  });
});

module.exports = roundRoutes;