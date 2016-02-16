/**
 * Created by coichedid on 20/04/15.
 */
'use strict';

var util = require('util'),
  fs = require('fs'),
  yeoman = require('yeoman-generator');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
  askForModuleName: function() {
    var modulesFolder = process.cwd() + '/modules/';
    var done = this.async();

    var prompts = [{
        type: 'list',
        name: 'moduleName',
        default: 'core',
        message: 'Which module does this directive belongs to?',
        choices: []
      },
      {
        type: 'checkbox',
        name: 'restrict',
        message: 'This directive will be restricted to:',
        choices: [{
            value: 'element',
            name: 'Element (E)',
            checked: true
          },{
            value: 'attribute',
            name: 'Attribute (A)',
            checked: false
          },{
            value: 'class',
            name: 'Class (C)',
            checked: false
          },{
            value: 'comments',
            name: 'Comment (M)',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'replaceContent',
        message: 'This directive replaces TAG?',
        default: false
      },
      {
        type: 'list',
        name: 'scopeType',
        message: 'This directive use which type of scope?',
        default: false,
        choices: [
          {
            value:'parent',
            name: 'Parent scope'
          },
          {
            value: 'child',
            name: 'Child scope'
          },
          {
            value: 'isolated',
            name: 'Isolated scope'
          }
        ]
      }
    ];

    // Add module choices
    if (fs.existsSync(modulesFolder)) {

      fs.readdirSync(modulesFolder).forEach(function(folder) {
        var stat = fs.statSync(modulesFolder + '/' + folder);

        if (stat.isDirectory()) {
          prompts[0].choices.push({
            value: folder,
            name: folder
          });
        }
      });
    }

    this.prompt(prompts, function(props) {
      this.moduleName = props.moduleName;
      this.slugifiedModuleName = this._.slugify(this.moduleName);

      this.slugifiedName = this._.slugify(this._.humanize(this.name));
      this.camelizedName = this._.camelize(this.slugifiedName);
      this.humanizedName = this._.humanize(this.slugifiedName);
      this.restrict = '';
      if (this._.contains(props.restrict, 'element'))  this.restrict += 'E';
      if (this._.contains(props.restrict, 'attribute'))  this.restrict += 'A';
      if (this._.contains(props.restrict, 'class'))  this.restrict += 'C';
      if (this._.contains(props.restrict, 'comment'))  this.restrict += 'M';
      this.replaceContent = props.replaceContent?true:false;
      this.scopeType = props.scopeType;
      done();
    }.bind(this));
  },

  renderDirectiveFile: function() {
    this.template('directive.js', 'modules/' + this.slugifiedModuleName + '/directives/' + this.slugifiedName + '.directive.js');
  },

  renderScssFile: function() {
    this.copy('directive.scss', 'modules/' + this.slugifiedModuleName + '/directives/' + this.slugifiedName + '.scss');
  }
});

module.exports = DirectiveGenerator;
