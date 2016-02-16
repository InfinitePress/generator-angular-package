'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _license;

var AngModuleGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');

    // Try to determine the name
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.description = 'This Angular components does ...';
  },

  prompting: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hi this is AngularJS Module Generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'author',
        message: 'Your full name:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter your full name';
        },
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your email:',
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return 'Please enter a valid email address';
        },
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'moduleName',
        message: 'Your module name:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter a module name';
        },
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'One-line description of your module:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter a brief description of your module';
        },
        default: this.description
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'List of keywords for your module, separated by comma:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter a comma-separated list of keywords';
        },
        default: "angular, ng"
      },
      {
        type: 'input',
        name: 'gitUrl',
        message: 'Your project\s Git URL:',
        validate: function (input) {
          if (/.+\..+/.test(input)) {
            return true;
          }
          return 'Please enter a URL';
        },
        store: true,
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License identifier (see https://spdx.org/licenses/ for all choices):',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter a license identifier';
        },
        default: "MIT"
      },
      {
        type: 'confirm',
        name: 'includeDirectives',
        message: 'Would you like to include a directives folder?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeFilters',
        message: 'Would you like to include a filters folder?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeServices',
        message: 'Would you like to include a services folder?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeControllers',
        message: 'Would you like to include a controllers folder?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeAngularModuleResource',
        message: 'Would you like to include the angular-resource module?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeAngularModuleCookies',
        message: 'Would you like to include the angular-cookies module?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeAngularModuleSanitize',
        message: 'Would you like to include the angular-sanitize module?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {

      var keywords = props.keywords.split(/\s*,\s*/).map(function(kw) {
        return '"' + kw + '"'
      }).join(',')
      keywords = '[' + keywords + ']'
      _license = props.license

      this.props = {

        moduleName: props.moduleName,
        description: props.description,
        gitUrl: props.gitUrl,
        keywords: keywords,
        license: props.license,

        author: {
          name: props.author,
          email: props.email
        },

        // Originally a humanized string like "Project Angular_Library"
        yourModule: {

          // String originally entered by user => "Project Angular_Library"
          original: props.moduleName,

          // Camelized => projectAngularLibrary
          camelized: this._.camelize(this._.underscored(props.moduleName)),

          // Dasherized (underscored and camelized to dashes) => project-angular-library
          dasherized: this._.dasherize(props.moduleName),

          // Slugified (whitespace and special chars replaced by dashes (great for url's)) => project-angular-library
          slugified: this._.slugify(props.moduleName),

          // Array of parts => [ 'project', 'angular', 'library' ]
          parts: this._.slugify(props.moduleName).split('-')
        },
        includeModuleDirectives: props.includeDirectives,
        includeModuleFilters: props.includeFilters,
        includeModuleServices: props.includeServices,
        includeModuleControllers: props.includeControllers,
        includeAngularModuleResource: props.includeAngularModuleResource,
        includeAngularModuleCookies: props.includeAngularModuleCookies,
        includeAngularModuleSanitize: props.includeAngularModuleSanitize
      };

      this.props.moduleDirectory = 'modules' + '/' + this.props.yourModule.slugified;
      this.props.moduleUnitTestDirectory = 'test' + '/unit/' + this.props.yourModule.slugified;
      this.props.moduleUnitE2eDirectory = 'test' + '/e2e/' + this.props.yourModule.slugified;

      this.config.set('props', this.props);

      done();
    }.bind(this));
  },

  writing: {
    /**
     * Create module files
     */
    createModuleFiles: function createModuleFiles() {

      this.mkdir('modules');
      this.mkdir('test');

      this.mkdir(this.props.moduleDirectory);
      this.mkdir(this.props.moduleUnitTestDirectory);
      this.mkdir(this.props.moduleUnitE2eDirectory);

      if (this.props.includeModuleDirectives) {
        this.mkdir(this.props.moduleDirectory + '/directives');
        this.mkdir(this.props.moduleUnitTestDirectory + '/directives');
      }

      if (this.props.includeModuleFilters) {
        this.mkdir(this.props.moduleDirectory + '/filters');
        this.mkdir(this.props.moduleUnitTestDirectory + '/filters');
      }

      if (this.props.includeModuleServices) {
        this.mkdir(this.props.moduleDirectory + '/services');
        this.mkdir(this.props.moduleUnitTestDirectory + '/services');
      }

      if (this.props.includeModuleControllers) {
        this.mkdir(this.props.moduleDirectory + '/controllers');
        this.mkdir(this.props.moduleUnitTestDirectory + '/controllers');
      }

      this.template('src/library/library.module.js', this.props.moduleDirectory + '/' + this.props.yourModule.slugified + '.module.js', {config: this.props});

      this.template('test/unit/library/librarySpec.js', this.props.moduleUnitTestDirectory + '/' + this.props.yourModule.slugified + 'Spec.js', {config: this.props});

    },

    /**
     * Create Gulp configuration
     */
    createGulpfile: function createGulpfile() {
      this.template('gulpfile.js', './gulpfile.js', {config: this.props});
    },

    /**
     * Create Package Json
     */
    createPackageJson: function createPackageJson() {
      this.template('_package.json', './package.json', {config: this.props});
    },

    /**
     * Create Bower files
     */
    createBowerFiles: function createBowerFiles() {
      this.template('_bower.json', './bower.json', {config: this.props});
      this.copy('bowerrc', '.bowerrc');
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaSrcConfig: function createKarmaConfig() {
      this.template('karma-src.conf.js', 'karma-src.conf.js', {config: this.props});
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaDistConcatenatedConfig: function createKarmaDistConcatenatedConfig() {
      this.template('karma-dist-concatenated.conf.js', 'karma-dist-concatenated.conf.js', {config: this.props});
    },

    /**
     * Create Karma unit test configuration
     */
    createKarmaDistMinifiedConfig: function createKarmaDistMinifiedConfig() {
      this.template('karma-dist-minified.conf.js', 'karma-dist-minified.conf.js', {config: this.props});
    },

    /**
     * Create README.md
     */
    createReadmeMd: function createReadmeMd() {
      this.template('README.md', 'README.md', {config: this.props});
    },

    /**
     * Create LICENSE.txt
     */
    createLicenseTxt: function createLicenseTxt() {
      if (_license === 'MIT') {
        this.template('_LICENSE.mit', 'LICENSE', {config: this.props});
      }
    },

    createProjectFiles: function createProjectFiles() {
      this.copy('editorconfig', '.editorconfig');
      this.copy('jshintrc', '.jshintrc');
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
    },

    createExampleHtml: function createExampleHtml() {
      this.template('example.html', 'example.html', {
        appName: this.props.yourModule.slugified
      });
    }

},

  end: function () {
    this.installDependencies();

    if (_license !== 'MIT') {
      this.log('Be sure to visit https://spdx.org/licenses/ and copy the text of whatever license you have chosen to a file named ./LICENSE .')
    }
  }
});

module.exports = AngModuleGenerator;
