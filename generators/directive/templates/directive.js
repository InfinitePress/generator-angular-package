/**
 * Created by coichedid on 21/04/15.
 */
'use strict';
angular.module('<%= slugifiedModuleName %>').directive('<%= camelizedName %>', [
  function() {
    return {
      template: '<div></div>',
      restrict: '<%= restrict %>',
      replace: <%= replaceContent %>,
      scope: <% if (scopeType == 'parent') {%> false <%} else if (scopeType == 'child') {%> true <%} else if (scopeType == 'isolated') {%>{}<%}%>,
      link: function postLink(scope, element, attrs) {
        // <%= humanizedName %> directive logic
        // ...

        element.text('this is the <%= camelizedName %> directive');
      }
    };
  }
]);
