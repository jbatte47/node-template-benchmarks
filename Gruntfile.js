"use strict";

// Required node modules
var loadTasks = require("load-grunt-tasks");
var stylish = require("jshint-stylish");

var specFiles = "test/**/*Spec.es";
var srcFiles = "src/**/*.js";
var testFiles = "test/**/*.js";

module.exports = function (grunt) {
  // Load grunt plugins
  loadTasks(grunt);

  grunt.initConfig({
    "bower": {
      install: {
        options: {
          targetDir: "./out/lib"
        }
      }
    },

    "jscs": {
      options: {
        config: ".jscsrc"
      },
      all: [
        "Gruntfile.js",
        srcFiles,
        testFiles
      ]
    },

    "jshint": {
      options: {
        jshintrc: true,
        reporter: stylish
      },
      all: [
        "Gruntfile.js",
        srcFiles,
        testFiles
      ]
    },

    "mochaTest": {
      test: {
        options: {
          reporter: "spec",
          require: "babel/register"
        },
        src: [specFiles]
      }
    },

    "pkg": grunt.file.readJSON("package.json"),

    "watch": {
      lint: {
        files: [srcFiles, testFiles],
        tasks: "lint"
      },
      tests: {
        files: [srcFiles, testFiles, specFiles],
        tasks: "mochaTest:test"
      }
    }
  });

  grunt.registerTask("lint", "Run JSHint and JSCS", [
    "jshint:all",
    "jscs:all"
  ]);

  grunt.registerTask("test", "Run tests", [
    "mochaTest"
  ]);
};
