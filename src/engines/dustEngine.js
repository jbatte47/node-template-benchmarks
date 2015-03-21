"use strict";

var _ = require("lodash");
var debug = require("debug")("benchmark:Dust");
var dust = require("dustjs-linkedin");

var util = require("../util");

function renderTemplate(name, model, callback) {
  dust.render(name, model, function (error, out) {
    if (!error) {
      callback(out);
    } else {
      throw new Error(error);
    }
  });
}

function prepareDust() {
  var name = "dust";
  var template = util.load("dust.dst");
  var compiled = dust.compile(template, name);
  dust.loadSource(compiled);
  debug("Dust parse complete!", compiled);

  return {
    render: _.curry(renderTemplate)(name)
  };
}

module.exports = prepareDust;
