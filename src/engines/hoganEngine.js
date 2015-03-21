"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Hogan");
var hogan = require("hogan.js");

var util = require("../util");

function renderTemplate(template, model, callback) {
  var output = template.render(model);
  callback(output);
}

function prepareHogan() {
  // we get to reuse the mustache template here :)
  var template = hogan.compile(util.load("mustache.mst"));
  debug("Hogan parse complete!", template);

  return {
    render: _.curry(renderTemplate)(template)
  };
}

module.exports = prepareHogan;
