"use strict";

var expect = require("chai").expect;

var RecordFactory = require("../src/recordFactory");

function assertResultCount(result, expectedCount) {
  return function run() {
    expect(result).to.be.ok;
    expect(result.records).to.be.ok;
    expect(result.records).to.have.length(expectedCount);
  };
}

describe("RecordFactory", () => {
  const factory = new RecordFactory();

  describe("#extraSmall", () => {
    it("should return an object with 1 row", () => assertResultCount(factory.extraSmall(), 1));
  });

  describe("#small", () => {
    it("should return an object with 10 rows", () => assertResultCount(factory.small(), 10));
  });

  describe("#medium", () => {
    it("should return an object with 100 rows", () => assertResultCount(factory.medium(), 100));
  });

  describe("#large", () => {
    it("should return an object with 1000 rows", () => assertResultCount(factory.large(), 1000));
  });

  describe("#extraLarge", () => {
    it("should return an object with 10000 rows", () => assertResultCount(factory.extraLarge(), 10000));
  });
});
