define(function (require) {
    'use strict';

    require('am-authentication');
    require('angular-mocks');

    var angular = require('angular');

    var module = angular.module('demo', ['am.authentication', 'ngMockE2E'])
        .controller('demoCtrl', function ($scope, $window) {
            $scope.errorFormatter = function () {
                return {title: 'demo', description: 'demo'};
            };
            $scope.resetSuccessFormatter = function(){
                return {title:'success', description:'Succesfully changed your password'};
            };

            $scope.resetPassword = function(){
                $window.location.href = '#/?token=12345&email=reset@reset.com#reset';
            };
        });

    module.run(function ($httpBackend) {
        $httpBackend.whenPOST('/login', {email: 'login@login.com', password: 'loggingin'}).respond(200);
        $httpBackend.whenPOST('/forgot', {email: 'forgot@forgot.com'}).respond(200, {
            'title': 'api.success.ok',
            'description': 'password.reset.email.sent'
        });
        $httpBackend.whenPOST('/reset', {email:'reset@reset.com',password: 'resetting', token:'12345'}).respond(200,{
            'title': 'api.success.ok',
            'description': 'password.reset.successful'
        });
        $httpBackend.whenPOST('/register', {email:'register@register.com',password: 'registering'}).respond(200,{
            'title': 'api.success.ok',
            'description': 'password.reset.successful'
        });
    });

    angular.bootstrap(document, ['demo']);

});


