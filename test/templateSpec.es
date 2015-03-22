"use strict";

var _ = require("lodash");
var expect = require("chai").expect;

var engines = require("../src/engines");
var RecordFactory = require("../src/recordFactory");
var util = require("../src/util");

function runRenderTest(model, csv, engine, done) {
  engine.render(model, (result) => {
    expect(result).to.equal(csv);
    done();
  });
}

describe("Ten records already in CSV format", () => {
  let csv = null;

  beforeEach(() => csv = util.load("tenRecords.csv"));
  afterEach(() => csv = null);

  describe("compared to the same ten records rendered in a CSV template", () => {
    let run = null;
    let model = null;

    beforeEach(() => {
      let factory = new RecordFactory();
      model = factory.small();
      run = _.curry(runRenderTest)(model)(csv);
    });
    afterEach(() => model = null);

    it("should match in mustache", (done) => run(engines.mustache(), done));

    it("should match in handlebars", (done) => run(engines.handlebars(), done));

    it("should match in dust", (done) => run(engines.dust(), done));

    it("should match in hogan", (done) => run(engines.hogan(), done));

    it("should match in lodash", (done) => run(engines.lodash(), done));

    it("should match in doT", (done) => run(engines.doT(), done));

    it("should match in nodeCsv", (done) => run(engines.nodeCsv, done));
  });
});
