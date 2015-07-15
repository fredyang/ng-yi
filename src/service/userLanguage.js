'use strict';

yiModule.factory('userLanguage', function ($window, yiConfig, $cookieStore) {


  var cookieName = yiConfig.cookieName;
  var cachedLanguage = $cookieStore.get(cookieName);

  if (!cachedLanguage) {
    userLanguage(getDefaultLanguage());
  }

  return userLanguage;

  function userLanguage(lang) {

    if (arguments.length === 0) {
      return cachedLanguage;
    } else {

      if (!(lang in yiConfig.supportedLanguages)) {
        lang = getDefaultLanguage();
      }
      cachedLanguage = lang;
      $cookieStore.put(cookieName, lang);
    }
  }

  function getDefaultLanguage() {
    //$window.navigator.language is supported by Chrome and Firefox like 'en-US'
    //$window.navigator.browserLanguage is supported by IE
    var browserLanguage = ($window.navigator.language || $window.navigator.browserLanguage).substr(0, 2);
    var defaultLanguage;


    //if browser language is not supported, then use the
    //default supported language as default language
    //
    if (!(browserLanguage in yiConfig.supportedLanguages)) {
      defaultLanguage = yiConfig.defaultLanguage;
    } else {
      defaultLanguage = browserLanguage;
    }
    return defaultLanguage
  }

});
