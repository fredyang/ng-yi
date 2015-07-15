'use strict';


describe('res directive', function () {



  it('can localize element\'s text', function () {

    inject(function ($compile, $rootScope, $httpBackend, userLanguage) {

      var $elem = $compile('<div yi="greeting"></div>')($rootScope);

      expect($elem.text()).toBe(enResource.greeting);


      //change language
      userLanguage('cn');

      //text is automatically changed
      $httpBackend.flush();
      expect($elem.text()).toBe(cnResource.greeting);

      //change back to original language
      userLanguage(null);


    });

  });

  it('can localize element\'s text with extra data', function () {

    inject(function ($compile, $rootScope, $httpBackend) {

      var $elem = $compile('<div yi="message"></div>')($rootScope);

      expect($elem.text()).toBe(enResource.message);


      $elem = $compile('<div yi="message" yi-data-name="fred"></div>')($rootScope);

      $rootScope.$digest();

      expect($elem.text()).toBe('Hello, fred');

      //the yi-data-name can use a scope property
      $rootScope.name = 'fred';

      $elem = $compile('<div yi="message" yi-data-name="{{name}}"></div>')($rootScope);

      $rootScope.$digest();

      expect($elem.text()).toBe('Hello, fred');

      //when yi-data-name change, the resource also get updated
      $rootScope.name = 'john';

      $rootScope.$digest();

      expect($elem.text()).toBe('Hello, john');

    });

  });

});
