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

router.get("/", (req, res) => {
  Trans.find({}, (err, trans) => {
    return res.status(err ? 400 :200).send(err || trans)
  })
});

router.put("/:id", (req, res) => {
  // console.log("req.body:", req.body)
  //   console.log("req.params:", req.params.id)
  Trans.findByIdAndUpdate(req.params.id ,req.body, (err, trans) => {
    return res.status(err ? 400 :200).send(err || trans)
  })
});

router.delete("/:id", (req, res) => {
  Trans.findByIdAndRemove(
    req.params.id,
    (err) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send("Successful Delete");
    }
  )
})


module.exports = router;