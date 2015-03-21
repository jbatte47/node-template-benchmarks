"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:node-csv");
var stringify = require("csv-stringify");

var util = require("../util");
var csvHeaders = require("../../assets/node-csv-header.json");

function renderTemplate(model, callback) {
  var input = [csvHeaders];

  _.each(model.records, function (record) {
    input.push(_.map(_.values(record), function (item) {
      return item.toString();
    }));
  });

  stringify(input, function (error, output) {
    callback(output);
  });
}

module.exports = {
  render: renderTemplate
};
