define(function (require) {
    'use strict';

    require('am-authentication');
    require('angular-mocks');

    var angular = require('angular');

    var module = angular.module('demo', ['am.authentication', 'ngMockE2E'])
        .controller('demoCtrl', function ($scope) {
            $scope.errorFormatter = function () {
                return {title: 'demo', description: 'demo'};
            };
        });

    module.run(function ($httpBackend) {
        $httpBackend.whenPOST('/login', {email: 'login@login.com', password: 'loggingin'}).respond(200);
        $httpBackend.whenPOST('/forgot', {email: 'forgot@forgot.com'}).respond(200, {
            'title': 'api.success.ok',
            'description': 'password.reset.email.sent'
        });
    });

    angular.bootstrap(document, ['demo']);

});


