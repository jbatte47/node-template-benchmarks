"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Trial");

var consts = require("./constants");

function createTrialConductor(trialName, config) {
  return function conductTrial() {
    var output = config.engine.render(config.data);
    debug(trialName, output);
  };
}

function Trial(options) {
  this.options = options;
}

Trial.prototype = Object.create(null);
Trial.prototype.constructor = Trial;

Trial.prototype.name = function (engine) {
  return consts.trialPrefix + "#" + engine + "(" + this.options.label + ")";
};

Trial.prototype.method = function (engine) {
  return createTrialConductor(this.name(engine), {
    data: this.options.data,
    engine: this.options.engines[engine]()
  });
};

module.exports = Trial;
