'use strict';

describe('<%= config.yourModule.orginal %>', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('<%= config.yourModule.camelized %>');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('<%= config.yourModule.camelized %>.config')).to.be.ok;
  });

  <% if(config.includeModuleFilters) { %>
  it('should load filters module', function() {
    expect(hasModule('<%= config.yourModule.camelized %>.filters')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleDirectives) { %>
  it('should load directives module', function() {
    expect(hasModule('<%= config.yourModule.camelized %>.directives')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleServices) { %>
  it('should load services module', function() {
    expect(hasModule('<%= config.yourModule.camelized %>.services')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleControllers) { %>
    it('should load controllers module', function() {
      expect(hasModule('<%= config.yourModule.camelized %>.controllers')).to.be.ok;
    });
  <% } %>

});
