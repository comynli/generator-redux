'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slugs = require('slugs');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pioneering ' + chalk.red('Redux') + ' generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'appName',
      message: 'What\'s the name of your application?',
      default: this.destinationPath().split(path.sep).pop()
    }, {
      type: 'string',
      name: 'appDesc',
      message: 'Describe your application in one sentence:',
      default: '...'
    },{
      type: 'string',
      name: 'port',
      message: 'Which port would you like to run on?',
      default: '3000'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.appSlug = slugs(props.appName).toLowerCase();
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  configuring: {

  },

  writing: {
    app: function () {
      this._copyTpl('_package.json' ,'package.json');
      this._copyTpl('npmrc' ,'.npmrc');
      this._copyTpl('gitignore' ,'.gitignore');
      this._copyTpl('_bower.json', 'bower.json');
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this._copyTpl('README.md' ,'README.md');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('proxy.config.js', 'proxy.config.js');
      this._copyTpl('server.js', 'server.js');
      this._copyTpl('index.html', 'index.html');
      this._copyTpl('app/index.js', 'app/index.js');
      this._copyTpl('app/routes.js', 'app/routes.js');
      this.directory('style', 'style');
      this.directory('app/actions', 'app/actions');
      this.directory('app/components', 'app/components');
      this.directory('app/constants', 'app/constants');
      this.directory('app/containers', 'app/containers');
      this.directory('app/store', 'app/store');
      this.directory('app/data', 'app/data');
      this.directory('app/reducers', 'app/reducers');
      this.directory('app/utils', 'app/utils');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  },

  _copyTpl: function (src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }
});
