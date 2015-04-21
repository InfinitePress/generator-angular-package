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
  module = angular.module('<%= config.yourModule.slugified %>');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('<%= config.yourModule.slugified %>.config')).to.be.ok;
  });

  <% if(config.includeModuleFilters) { %>
  it('should load filters module', function() {
    expect(hasModule('<%= config.yourModule.slugified %>.filters')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleDirectives) { %>
  it('should load directives module', function() {
    expect(hasModule('<%= config.yourModule.slugified %>.directives')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleServices) { %>
  it('should load services module', function() {
    expect(hasModule('<%= config.yourModule.slugified %>.services')).to.be.ok;
  });
  <% } %>

  <% if(config.includeModuleControllers) { %>
    it('should load controllers module', function() {
      expect(hasModule('<%= config.yourModule.slugified %>.controllers')).to.be.ok;
    });
  <% } %>

});
