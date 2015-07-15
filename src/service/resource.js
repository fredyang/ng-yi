'use strict';


yiModule.factory('resource', function ($http, $rootScope, userLanguage, yiConfig) {

  var resourceCache;

  var regDot = /\./;

  function evalObjectPath(object, path) {

    path = path + '';

    if (!regDot.test(path)) {
      return object[path];
    }

    var parts = path.split('.');
    var node = object;
    //
    for (var i = 0; i < parts.length; i++) {
      var value = node[parts[i]];
      if (value === undefined) {
        return undefined;
      } else {
        node = value;
      }
    }
    return node;
  };


  var rSupplant = /\{([^\{\}]*)\}/g;

  function supplant(string, obj) {
    return string.replace(rSupplant,
      function (a, b) {
        var r = obj[b];
        return typeof r ? r : a;
      });
  }


  $rootScope.$watch(function () {
    return userLanguage();
  }, function (lang) {
    resourceCache = $http.get(yiConfig.resourcePath + lang + '.json').then(function (response) {
      resourceCache = response.data;
      $rootScope.$broadcast(rtn.changedEvent);
      return resourceCache;
    });
  });

  var rtn = {

    changedEvent: 'resourceChanged',

    //resource.get('greeting', {fullName: "John Doe" });
    //data is optional
    //if 'greeting' resource is "hello, {fullName}", then it will
    //return "hello, John Doe"
    get: function (resourceId, data) {

      if (!resourceCache || (!!resourceCache && angular.isFunction(resourceCache.then))) {
        return '';
      } else {
        var text = evalObjectPath(resourceCache, resourceId);
        if (data) {
          text = supplant(text, data);
        }
        if (angular.isUndefined(text)) {
          throw new Error('resource for ' + resourceId + ' does not exists');
        }
        return text;
      }
    },

    //support
    //onChanged(fn, scope) //evaluateImmediately is true by default
    //onChanged(evaluateImmediately, fn, scope)
    onChanged: function (evaluateImmediately, fn, scope) {

      if (angular.isFunction(evaluateImmediately)) {
        scope = fn;
        fn = evaluateImmediately;
        evaluateImmediately = true;
      }

      if (evaluateImmediately) {
        fn();
      }

      scope.$on(rtn.changedEvent, fn);
    }
  };

  return rtn;

});
