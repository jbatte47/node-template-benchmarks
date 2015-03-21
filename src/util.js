"use strict";

var fs = require("fs");

function loadAsset(name) {
  var path = "/../assets/" + name;
  return fs.readFileSync(__dirname + path, "utf8");
}

module.exports = {
  load: loadAsset
};
