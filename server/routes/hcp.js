const express = require("express");


const hcpRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
//const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the rounds.
hcpRoutes.route("/hcp").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("rounds")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      let hcp = result.reduce( function(a, b) {
        return a + b['score']
      }, 0);
      res.json({ hcp: hcp });
    });
});

module.exports = hcpRoutes;