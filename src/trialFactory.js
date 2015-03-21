"use strict";

var consts = require("./constants");
var debug = require("debug")("benchmark:TrialFactory");
var engines = require("./engines");
var RecordFactory = require("./recordFactory");
var Trial = require("./trial");

function createTrial(factory, method, label) {
  debug(consts.creatingTrial(method, label));

  return new Trial({
    data: factory[method](),
    engines: engines,
    label: label
  });
}

function TrialFactory(recordFactory) {
  this.recordFactory = recordFactory || new RecordFactory();
}

TrialFactory.prototype = Object.create(null);
TrialFactory.prototype.constructor = TrialFactory;

TrialFactory.prototype.extraSmall = function () {
  return createTrial(this.recordFactory, "extraSmall", "XS");
};

TrialFactory.prototype.small = function () {
  return createTrial(this.recordFactory, "small", "SM");
};

TrialFactory.prototype.medium = function () {
  return createTrial(this.recordFactory, "medium", "MD");
};

TrialFactory.prototype.large = function () {
  return createTrial(this.recordFactory, "large", "LG");
};

TrialFactory.prototype.extraLarge = function () {
  return createTrial(this.recordFactory, "extraLarge", "XL");
};

module.exports = TrialFactory;
