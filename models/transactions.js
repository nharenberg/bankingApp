'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tranSchema = new Schema ({

  credit: {type: Number},
  debit: {type: Number},
  total: {type: Number},
  date: {type: String},
  description: {type: String}
})

const Trans = mongoose.model("Trans", tranSchema);

module.exports = Trans