"use strict";

var chai = require("chai");
var sinon = require("sinon");

var assert = chai.assert;
var expect = chai.expect;
var Trial = require("../src/trial");
var TrialFactory = require("../src/trialFactory");

function mockRecordFactory() {
  return {
    extraSmall: sinon.stub().returns([]),
    small: sinon.stub().returns([]),
    medium: sinon.stub().returns([]),
    large: sinon.stub().returns([]),
    extraLarge: sinon.stub().returns([])
  };
}

function assertCalledOnce(mock, size)
{
  let stub = mock[size];
  expect(stub).to.be.ok;
  assert(stub.calledOnce, "RecordFactory." + size + " should have been called once");
}

describe("TrialFactory", () => {
  let factory = null;
  let mock = null;

  beforeEach(() => {
    mock = mockRecordFactory();
    factory = new TrialFactory(mock);
  });

  afterEach(() => {
    mock = null;
    factory = null;
  });

  describe("#extraSmall", () => {
    let result = null;

    beforeEach(() => result = factory.extraSmall());
    afterEach(() => result = null);

    it("should use the record factory to create an extra small dataset", () => assertCalledOnce(mock, "extraSmall"));
    it("should return a Trial object", () => expect(result).to.be.instanceOf(Trial));
  });

  describe("#small", () => {
    let result = null;

    beforeEach(() => result = factory.small());
    afterEach(() => result = null);

    it("should use the record factory to create a small dataset", () => assertCalledOnce(mock, "small"));
    it("should return a Trial object", () => expect(result).to.be.instanceof(Trial));

  });

  describe("#medium", () => {
    let result = null;

    beforeEach(() => result = factory.medium());
    afterEach(() => result = null);

    it("should use the record factory to create a medium dataset", () => assertCalledOnce(mock, "medium"));
    it("should return a Trial object", () => expect(result).to.be.instanceOf(Trial));

  });

  describe("#large", () => {
    let result = null;

    beforeEach(() => result = factory.large());
    afterEach(() => result = null);

    it("should use the record factory to create a large dataset", () => assertCalledOnce(mock, "large"));
    it("should return a Trial object", () => expect(result).to.be.instanceOf(Trial));
  });

  describe("#extraLarge", () => {
    let result = null;

    beforeEach(() => result = factory.extraLarge());
    afterEach(() => result = null);

    it("should use the record factory to create an extra large dataset", () => assertCalledOnce(mock, "extraLarge"));
    it("should return a Trial object", () => expect(result).to.be.instanceOf(Trial));
  });
});
