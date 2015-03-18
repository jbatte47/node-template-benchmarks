"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");

var src = require("../src");

describe("Trial", () => {

  let engine = "mocha";
  let label = "test";
  let mochaEngine = { render: function (data) {} };
  let mock = sinon.mock(mochaEngine);

  let target = new src.Trial({
    data: {
      records: [{}] // single record; content doesn't matter here
    },
    engines: {
      mocha: function () {
        return mochaEngine;
      }
    },
    label: label
  });

  describe("#name", () => {

    it("should incorporate the chosen engine and a label", () => {

      let expected = src.consts.trialPrefix + "#" + engine + "(" + label + ")";
      let actual = target.name(engine);
      expect(actual).to.equal(expected); // plain and simple

    });
  });

  describe("#method", () => {

    it("should return a callable function with no named parameters", () => {

      let result = target.method(engine);
      expect(result).to.be.ok; // truthy means we got a result
      expect(result).to.be.a("function"); // and it's a function like we'd hoped
      expect(result.length).to.equal(0); // with the right number of args (zero)

    });

    it("should return a function that correctly utilizes the chosen engine", () => {

      mock.expects("render").once().returns(""); // should be asked to render once
      target.method(engine)(); // just run; no need for return values
      mock.verify(); // verify assumptions

    });

  });
});
