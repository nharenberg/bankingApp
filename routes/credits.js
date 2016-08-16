"use strict";

const express = require("express");
const router = express.Router();
const Trans = require("../models/transactions")


router.post("/", (req, res) => {
  console.log("inside post route");
  Trans.create(req.body, (err, trans) => {
        if (err) return res.status(400).send(err)
          res.send(trans);
  })
})


/////////////////
router.get("/", (req, res) => {
  Trans.find({}, (err, trans) => {
    return res.status(err ? 500 :200).send(err || trans)

  })
});

module.exports = router;