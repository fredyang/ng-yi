'use strict';

//yi-attr="{ placeholder : 'username'}"
yiModule.directive('yiAttr', function (resource) {

  var yiDataAttribute = /^yi-data-(.*)/;

  return function (scope, element, attrs) {

    var data;

    var localizedAttributes = scope.$eval(attrs.yiAttr);


    angular.forEach(attrs.$attr, function (attr, normalizedAttr) {

      var match = yiDataAttribute.exec(attr);
      if (match) {
        data = data || {};
        var key = match[1];
        attrs.$observe(normalizedAttr, function (newVal, oldVal) {
          if ((newVal && newVal !== oldVal) || !(data && data[key])) {
            data[key] = attrs[normalizedAttr];
            updateAttribute();
          }
        });
      }
    });

    function updateAttribute() {
      for (var attrName in localizedAttributes) {
        var resourceKey = localizedAttributes[attrName];
        var resourceValue = resource.get(resourceKey, data);
        element.attr(attrName, resourceValue);
      }
    }


    resource.onChanged(!data, updateAttribute, scope);
  };
});
