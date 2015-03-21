"use strict";

var _ = require("lodash");
var Benchmark = require('benchmark');
var debug = require("debug")("benchmark");
var fs = require("fs-extra");
var util = require("util");

var src = require("./src");

var factory = new src.TrialFactory();

debug("Beginning benchmark run");
debug("Creating trial runs");

var trials = {
  XS: {
    trial: factory.extraSmall(),
    suite: new Benchmark.Suite("Extra Small")
  },
  SM: {
    trial: factory.small(),
    suite: new Benchmark.Suite("Small")
  },
  MD: {
    trial: factory.medium(),
    suite: new Benchmark.Suite("Medium")
  },
  LG: {
    trial: factory.large(),
    suite: new Benchmark.Suite("Large")
  },
  XL: {
    trial: factory.extraLarge(),
    suite: new Benchmark.Suite("Extra Large")
  }
};

Benchmark.Suite.prototype.addTrial = function addTrial(session, name, size) {
  debug("Adding trial", name + " (" + size + ")");
  return this.add(name, session.trial.method(name));
};

function BenchmarkResults(runs, onComplete) {
  this.results = {};
  this.runs = runs;
  this.runCount = runs.length;
  this.onComplete = onComplete;

  this.add = function (target, size) {
    var engineResults = this.results[target.name] = this.results[target.name] || {
      name: target.name,
      type: "spline",
      showInLegend: true,
      dataPoints: _.map(this.runs, function (run) {
        return { label: run };
      })
    };

    var point = _.find(engineResults.dataPoints, function (item) {
      return item.label === size;
    })

    point["y"] = target.hz;
  };

  this.runComplete = function () {
    this.runCount -= 1;
    if (this.runCount === 0) {
      var data = _.values(this.results);
      debug("Benchmark complete", util.inspect(data, {depth:null,colors:true}));
      this.onComplete(data);
    }
  };
}

var results = new BenchmarkResults(_.keys(trials), function (data) {
  var css = __dirname + "/out/css/style.css";
  fs.ensureFileSync(css);
  fs.copySync(__dirname + "/assets/style.css", css);
  var index = __dirname + "/out/index.html";
  fs.ensureFileSync(index);
  fs.copySync(__dirname + "/assets/index.html", index);
  fs.writeFileSync(__dirname + "/out/data.json", JSON.stringify(data, null, 2));
  debug("Results written to file");
});

_.forIn(trials, function (session, size) {
  debug("Setting up trial suite", size);

  var suite = session.suite
    .addTrial(session, "mustache", size)
    .addTrial(session, "handlebars", size)
    .addTrial(session, "dust", size)
    .addTrial(session, "hogan", size)
    .addTrial(session, "lodash", size)
    .addTrial(session, "doT", size)
    .addTrial(session, "nodeCsv", size)
    .on("cycle", function (event) {
      debug(event.target.name + " (" + size + ")", "Operations per second: " + event.target.hz);
      results.add(event.target, size)
    })
    .on("complete", function () {
      var winner = this.filter("fastest");
      var name = winner.pluck("name");
      var rate = winner.pluck("hz");
      debug("Fastest engine for " + size + " is " + name,
        "With a scorching " + rate + " operations per second!");
      results.runComplete();
    });

  debug("Running trial suite", size);

  suite.run({ defer: true, async: true });
});
