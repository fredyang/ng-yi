'use strict';

beforeEach(module('ng-yi'));

var enResource = {
  greeting: 'hello',
  person: {
    firstName: 'John'
  },
  message: 'Hello, {name}'
};

var cnResource = {
  greeting: '您好',
  person: {
    firstName: '约翰'
  },
  message: '您好, {name}'
};

beforeEach(module(function ($provide) {

  $provide.decorator('$http', function ($delegate) {
    spyOn($delegate, 'get').and.callThrough();
    return $delegate;
  });

}));


beforeEach(inject(function (yiConfig, $httpBackend, userLanguage, resource) {

  yiConfig.supportedLanguages.cn = "中文";

  var userLanguage = userLanguage();

  $httpBackend.when('GET', 'resource/' + userLanguage + '.json').respond(enResource);

  $httpBackend.when('GET', 'resource/cn.json').respond(cnResource);

  $httpBackend.flush();

}));
