'use strict';


describe('resource', function () {




  it('resource will automatically get resource during bootstrap', function () {

    inject(function ($http) {
      expect($http.get).toHaveBeenCalled();
    });
  });


  it('can get resource by key and data', function () {


    inject(function (resource, $rootScope, $httpBackend) {

      expect(resource.get('greeting')).toBe(enResource.greeting);
      expect(resource.get('person.firstName')).toBe(enResource.person.firstName);

      expect(function () {
        //resource key does not exists
        resource.get('person.lastName');

      }).toThrow();

      expect(resource.get('message', {name: 'fred'})).toBe('Hello, fred');

    });
  });

  it('can switch to another resource, when user language change', function () {


    inject(function (resource, $httpBackend, userLanguage, $rootScope) {

      expect(resource.get('greeting')).toBe(enResource.greeting);

      userLanguage('cn');

      //you need to flush to get the new resource
      $httpBackend.flush();

      expect(resource.get('greeting')).toBe(cnResource.greeting);

      userLanguage(null);
      $httpBackend.flush();
    });

  });


});
