"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Dust");
var dot = require("dot");

var util = require("../util");

function renderTemplate(template, model, callback) {
  var output = template(model);
  callback(output);
}

function prepareDot() {
  dot.templateSettings.strip = false;
  var template = dot.template(util.load("dot.dot"));
  debug("doT parse complete!", template);

  return {
    render: _.curry(renderTemplate)(template)
  };
}

module.exports = prepareDot;
