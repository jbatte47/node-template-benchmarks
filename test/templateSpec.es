"use strict";

var expect = require("chai").expect;

var engines = require("../src/engines");
var RecordFactory = require("../src/recordFactory");
var util = require("../src/util");

describe("Ten records already in CSV format", () => {
  let csv = null;

  beforeEach(() => csv = util.load("tenRecords.csv"));
  afterEach(() => csv = null);

  describe("compared to the same ten records rendered in a CSV template", () => {
    let model = null;

    beforeEach(() => {
      let factory = new RecordFactory();
      model = factory.small();
    });
    afterEach(() => model = null);

    it("should match in mustache", (done) => {
      engines.mustache().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in handlebars", (done) => {
      engines.handlebars().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in dust", (done) => {
      engines.dust().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in hogan", (done) => {
      engines.hogan().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in lodash", (done) => {
      engines.lodash().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in doT", (done) => {
      engines.doT().render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });

    it("should match in node-csv", (done) => {
      engines.nodeCsv.render(model, (result) => {
        expect(result).to.equal(csv);
        done();
      });
    });
  });
});
