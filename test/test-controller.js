/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
//var assert = require('yeoman-generator').assert;
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');
var temp = require('temp').track();
var exec = require('child_process').exec;
var async = require('async');

describe('angular-package:controller', function () {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        console.log('Error', err);
        return err;
      }
      done();
    });
  });

  describe('Generate an AngularJS controller file through the sub-generator', function() {
    beforeEach(function(done) {
      runGenerator('controller',
        'foo',
        this, {
          'moduleName': 'core'
        }, done);
    });

    it('should generate an angular directive file', function(done) {
      assert.file('modules/core/controllers/foo.controller.js');
      assert.file('test/unit/core/controllers/foo.controller.test.js');
      done();
    });
  });

});

//Extending the yeoman helper method
function runGenerator(generatorType, name, context, promptAnswers, done) {
  var workspace = context.workspace = temp.mkdirSync();
  helpers.testDirectory(workspace, function(err) {

    if (err) {
      return done(err);
    }

    this.app = helpers.createGenerator('angular-package:' + generatorType, [
      path.resolve(__dirname, '../generators/' + generatorType)
    ], [name]);

    helpers.mockPrompt(this.app, promptAnswers);

    this.app.options['skip-install'] = true;

    this.app.run({}, function() {
      done();
    });

  }.bind(context));
}
