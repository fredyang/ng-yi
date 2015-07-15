'use strict';

describe('userLanguage', function () {

  var userLanguage, browerLanuage;

  beforeEach(inject(function (_userLanguage_, $window) {
    userLanguage = _userLanguage_;
    browerLanuage = ($window.navigator.language || $window.navigator.browserLanguage).substr(0, 2);
  }));



  it('can use browser language as the default language and change to other language', function () {

    expect(userLanguage()).toBe(browerLanuage);

    //setup the test for next
    userLanguage('cn');
    expect(userLanguage()).toBe('cn');

    //do not do this, to test the next one
    //userLanguage(null);

  });


  it('can persist', function () {

    expect(userLanguage()).toBe('cn');
    userLanguage(null);
  });

  it('can be reset', function () {
    expect(userLanguage()).toBe(browerLanuage);
  });


});
