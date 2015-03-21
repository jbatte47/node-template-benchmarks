"use strict";

var _ = require("lodash");
var consts = require("./constants");
var debug = require("debug")("benchmark:RecordFactory");

function createRecords(data, count) {
  debug(consts.creatingDataset(count));

  return {
    records: _.map(new Array(count), function () {
      return data;
    })
  };
}

function RecordFactory() {
  this.data = {
    firstName: "John",
    lastName: "Batte",
    age: 35,
    handsome: true
  };
}

RecordFactory.prototype = Object.create(null);
RecordFactory.prototype.constructor = RecordFactory;

RecordFactory.prototype.extraSmall = function () {
  return createRecords(this.data, 1);
};

RecordFactory.prototype.small = function () {
  return createRecords(this.data, 10);
};

RecordFactory.prototype.medium = function () {
  return createRecords(this.data, 100);
};

RecordFactory.prototype.large = function () {
  return createRecords(this.data, 1000);
};

RecordFactory.prototype.extraLarge = function () {
  return createRecords(this.data, 10000);
};

module.exports = RecordFactory;
