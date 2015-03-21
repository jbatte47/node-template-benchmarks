"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");

var src = require("../src");

let engine = "mocha";
let label = "test";
let mochaEngine = { render: function (data,cb) { cb(); } };
let mock = sinon.mock(mochaEngine);

describe("Trial", () => {
  let target = null;
  let options = null;

  beforeEach(() => {
    options = {
      data: {
        records: [{}] // single record; content doesn't matter here
      },
      engines: {
        mocha: mochaEngine
      },
      label: label
    };
    target = new src.Trial(options);
  });

  afterEach(() => target = null);

  it("should have a function named #method", () => expect(src.Trial).to.respondTo("method"));

  describe("#constructor", () => {
    it("should return an instance of Trial", () => expect(new src.Trial()).to.be.instanceof(src.Trial));

    it("should set the options property specified by the options argument", () => {
      const expectedOptions = options;

      expect(new src.Trial(options).options).to.eql(expectedOptions);
    });
  });

  describe("#method", () => {
    let result = null;
    let factory = null;
    let trial = null;
    let oneRecord = null;

    before(() => oneRecord = src.util.load("oneRecord.csv"));

    beforeEach(() => {
      result = target.method(engine);
      factory = new src.TrialFactory();
      trial = factory.extraSmall();
    });

    it("should return a function", () => expect(result).to.be.a("function"));

    describe("returned function", () => {
      it("should have one named parameter", () => expect(result).to.have.length(1)); // optional deferred object
      it("should correctly utilize the chosen engine", () => {
        mock.expects("render").once().yields("");
        result(); // just run; no need for return values
        mock.verify(); // assert the above was true ("render" called exactly once on the correct engine)
      });
    });

    describe("with mustache as the engine", () => {
      it("should conduct successfully", () => trial.method("mustache")());
    });

    describe("with handlebars as the engine", () => {
      it("should conduct successfully", () => trial.method("handlebars")());
    });

    describe("with dust as the engine", () => {
      it("should conduct successfully", () => trial.method("dust")());
    });

    describe("with hogan as the engine", () => {
      it("should conduct successfully", () => trial.method("hogan")());
    });

    describe("with lodash as the engine", () => {
      it("should conduct successfully", () => trial.method("lodash")());
    });

    describe("with doT as the engine", () => {
      it("should conduct successfully", () => trial.method("doT")());
    });

    describe("with node-csv as the engine", () => {
      it("should conduct successfully", () => trial.method("nodeCsv")());
    });

  });
});
