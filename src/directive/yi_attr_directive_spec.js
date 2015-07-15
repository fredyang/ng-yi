'use strict';

describe('yi-attr', function () {


  it('can update attribute with dynamic data and user language', function () {

    inject(function ($httpBackend, $compile, $rootScope, userLanguage) {



      var $elem = $compile('<input yi-attr="{ placeholder : \'greeting\'}">')($rootScope);


      expect($elem.attr('placeholder')).toBe(enResource.greeting);


      $elem = $compile('<input yi-attr="{ placeholder : \'message\'}">')($rootScope);

      $rootScope.$digest();

      expect($elem.attr('placeholder')).toBe(enResource.message);

      $elem = $compile('<input yi-attr="{ placeholder : \'message\'}" yi-data-name="fred">')($rootScope);

      $rootScope.$digest();

      expect($elem.attr('placeholder')).toBe('Hello, fred');


      $rootScope.name = 'jeff';

      $elem = $compile('<input yi-attr="{ placeholder : \'message\'}" yi-data-name="{{name}}">')($rootScope);

      $rootScope.$digest();

      expect($elem.attr('placeholder')).toBe('Hello, jeff');

      $rootScope.name = 'john';
      $rootScope.$digest();

      expect($elem.attr('placeholder')).toBe('Hello, john');

      userLanguage('cn');

      $httpBackend.flush();

      expect($elem.attr('placeholder')).toBe('您好, john');

      userLanguage(null);
    });

  });

});
