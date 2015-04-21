(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('<%= config.yourModule.camelized %>.config', [])
      .value('<%= config.yourModule.camelized %>.config', {
          debug: true
      });

  // Modules<% if (config.includeModuleDirectives){ %>
  angular.module('<%= config.yourModule.camelized %>.directives', []);<% } %><% if (config.includeModuleFilters){ %>
  angular.module('<%= config.yourModule.camelized %>.filters', []);<% } %><% if (config.includeModuleServices){ %>
  angular.module('<%= config.yourModule.camelized %>.services', []);<% } %>
  angular.module('<%= config.yourModule.camelized %>',
      [
          '<%= config.yourModule.camelized %>.config'<% if (config.includeModuleDirectives){ %>,
          '<%= config.yourModule.camelized %>.directives'<% } %><% if (config.includeModuleFilters){ %>,
          '<%= config.yourModule.camelized %>.filters'<% } %><% if (config.includeModuleServices){ %>,
          '<%= config.yourModule.camelized %>.services'<% } %><% if (config.includeAngularModuleResource){ %>,
          'ngResource'<% } %><% if (config.includeAngularModuleCookies){ %>,
          'ngCookies'<% } %><% if (config.includeAngularModuleSanitize){ %>,
          'ngSanitize'<% } %>
      ]);

})(angular);
