/**
 * Created by coichedid on 21/04/15.
 */
'use strict';

angular.module('<%= slugifiedModuleName %>').factory('<%= classifiedServiceName %>', [
  function() {
    // <%= humanizedServiceName %> service logic
    // ...

    // Public API
    return {
      someMethod: function() {
        return true;
      }
    };
  }
]);
