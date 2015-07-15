'use strict';

yiModule.filter('yi', function (resource) {
  //support
  // 'key' | yi;
  function resFilter(resourceKey) {
    return resource.get(resourceKey);
  };

  resFilter.$stateful = true;

  return resFilter;

});
