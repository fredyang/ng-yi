'use strict';

describe('res filter', function () {

  it('can update when language change', function () {

    inject(function ($httpBackend, $compile, $rootScope, userLanguage) {

      var $elem = $compile('<div>{{"greeting" | yi}}</div>')($rootScope);

      $rootScope.$digest();

      expect($elem.text()).toBe(enResource.greeting);

      userLanguage('cn');

      $rootScope.$digest();

      $httpBackend.flush();

      expect($elem.text()).toBe(cnResource.greeting);

      userLanguage(null);

    });

  });

  it('can get resource by multiple-part key', function () {
    inject(function ($httpBackend, $compile, $rootScope, userLanguage) {

      var $elem = $compile('<div>{{"person.firstName" | yi}}</div>')($rootScope);

      $rootScope.$digest();

      expect($elem.text()).toBe(enResource.person.firstName);

      userLanguage('cn');

      $rootScope.$digest();

      $httpBackend.flush();

      expect($elem.text()).toBe(cnResource.person.firstName);

      userLanguage(null);
    });

  });

});
