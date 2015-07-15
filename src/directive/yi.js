'use strict';

yiModule.directive('yi', function (resource) {

  var resDataAttribute = /^yi-data-(.*)/;

  return function (scope, element, attrs) {

    var data;

    //search for attributes yi-data-fullname, in
    //<span res="greeting" yi-data-fullname="{{fullname}}"></span>
    //to create a data object like { fullname: value_of_fullname }
    //
    //if greeting is "My name is {fullname}" and fullname is "Fred"
    //then output will name "My name is Fred
    angular.forEach(attrs.$attr, function (attr, normalizedAttr) {

      var match = resDataAttribute.exec(attr);
      if (match) {
        data = data || {};
        var key = match[1];
        attrs.$observe(normalizedAttr, function (newVal, oldVal) {
          if ((newVal && newVal !== oldVal) || !(data && data[key])) {
            data[key] = attrs[normalizedAttr];
            updatHtml();
          }
        });
      }
    });

    function updatHtml() {

      element.html(resource.get(attrs.yi, data));
    }

    //if data is not empty, delay a little
    //so that let attrs.$observe to do the update
    resource.onChanged(!data, updatHtml, scope);
  };
});
