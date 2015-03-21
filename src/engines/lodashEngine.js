"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Lodash");

var util = require("../util");

function renderTemplate(template, model, callback) {
  var output = template(model);
  callback(output);
}

function prepareLodash() {
  var template = _.template(util.load("lodash.ldt"));
  debug("Lodash parse complete!", template);

  return {
    render: _.curry(renderTemplate)(template)
  };
}

module.exports = prepareLodash;
