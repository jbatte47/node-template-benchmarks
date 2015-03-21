"use strict";

var debug = require("debug")("benchmark:Trial");

var consts = require("./constants");

function createTrialConductor(trialName, config) {
  return function conductTrial(deferred) {
    config.engine.render(config.data, function (output) {
      debug(trialName, consts.trialConducted(output));
      if(deferred) {
        deferred.resolve(); // tell benchmark this trial is done
      }
    });
  };
}

function Trial(options) {
  this.options = options;
}

Trial.prototype = Object.create(null);
Trial.prototype.constructor = Trial;

Trial.prototype.method = function (engineName) {
  var engine = this.options.engines[engineName];
  engine = typeof engine === "function" ? engine() : engine;

  return createTrialConductor(engineName, {
    data: this.options.data,
    engine: engine
  });
};

module.exports = Trial;
