"use strict";

module.exports = {
  trialPrefix: "TemplateBenchmarks",
  creatingDataset: function(count) {
    return "Creating dataset: " + count + " record" + (count === 1 ? "" : "s");
  },
  creatingTrial: function(method, label) {
    return "Creating Trial: " + method + " (" + label + ")";
  },
  trialConducted: function(results) {
    return "(" + results.length + "): " + results;
  }
};
