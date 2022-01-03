const express = require("express");

// courseRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /course.
const courseRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
//const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the courses.
courseRoutes.route("/course").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("courses")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single course by id
courseRoutes.route("/course/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  db_connect
      .collection("courses")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new course.
courseRoutes.route("/course/add").post(function (req, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    name: req.body.name,
    par: req.body.par,
    slope: req.body.slope,
    courseRating: req.body.courseRating,
    tees: req.body.tees,
  };
  db_connect.collection("courses").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a course by id.
courseRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  let newvalues = {
    $set: {
      id : req.body.id,
      name: req.body.name,
      par: req.body.par,
      slope: req.body.slope,
      courseRating: req.body.courseRating,
      tees: req.body.tees,
    },
  };
  db_connect
    .collection("courses")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a course
courseRoutes.route("/course/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { id: parseInt(req.params.id) };
  db_connect.collection("courses").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log('Course with id ' + req.params.id + ' was deleted.');
    response.send(obj);
  });
});

module.exports = courseRoutes;