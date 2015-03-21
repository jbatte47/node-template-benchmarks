"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Handlebars");
var Handlebars = require("handlebars");

var util = require("../util");

function renderTemplate(template, model, callback) {
  var output = template(model);
  callback(output);
}

function prepareHandlebars() {
  // we get to reuse the mustache template here :)
  var template = Handlebars.compile(util.load("mustache.mst"));
  debug("Handlebars parse complete!", template);

  return {
    render: _.curry(renderTemplate)(template)
  };
}

module.exports = prepareHandlebars;
