"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Mustache");
var Mustache = require("mustache");

var util = require("../util");

function renderTemplate(template, model, callback) {
  var output = Mustache.render(template, model);
  callback(output);
}

function prepareMustache() {
  var template = util.load("mustache.mst");
  Mustache.parse(template);
  debug("Mustache parse complete!", template);

  return {
    render: _.curry(renderTemplate)(template)
  };
}

module.exports = prepareMustache;
