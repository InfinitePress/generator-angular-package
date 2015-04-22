(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('<%= config.yourModule.slugified %>.config', [])
      .value('<%= config.yourModule.slugified %>.config', {
          debug: true
      });

  // Modules
  <% if (config.includeModuleDirectives){ %>
  angular.module('<%= config.yourModule.slugified %>.directives', []);
  <% } %>
  <% if (config.includeModuleFilters){ %>
  angular.module('<%= config.yourModule.slugified %>.filters', []);
  <% } %>
  <% if (config.includeModuleServices){ %>
  angular.module('<%= config.yourModule.slugified %>.services', []);
  <% } %>
  <% if (config.includeModuleControllers){ %>
    angular.module('<%= config.yourModule.slugified %>.controllers', []);
  <% } %>
  angular.module('<%= config.yourModule.slugified %>',
      [
        '<%= config.yourModule.slugified %>.config'<% if (config.includeModuleDirectives){ %>,
        '<%= config.yourModule.slugified %>.directives'<% } %><% if (config.includeModuleFilters){ %>,
        '<%= config.yourModule.slugified %>.filters'<% } %><% if (config.includeModuleServices){ %>,
        '<%= config.yourModule.slugified %>.services'<% } %><% if (config.includeModuleControllers){ %>,
        '<%= config.yourModule.slugified %>.controllers'<% } %><% if (config.includeAngularModuleResource){ %>,
        'ngResource'<% } %><% if (config.includeAngularModuleCookies){ %>,
        'ngCookies'<% } %><% if (config.includeAngularModuleSanitize){ %>,
        'ngSanitize'<% } %>
      ]);

})(angular);
