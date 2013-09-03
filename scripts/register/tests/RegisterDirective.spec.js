define(function (require) {
    'use strict';

    require('angular-mocks');
    require('scripts/register/RegisterModule');
    var $ = require('jquery');
    var angular = require('angular');

    describe('Register Directive Tests', function () {
        describe('SHOULD', function () {

            var template = '<div ng-controller="TestCtrl"><div am-register ' +
                'class="register-container" ' +
                'email="email" ' +
                'password="password" ' +
                'success-redirect="application" ' +
                'forgot-redirect="forgot" ' +
                'login-redirect="login" ' +
                'error-formatter="errorFormatter(value)" ' +
                'endpoint="/register"' +
                'text="translations" > </div></div>';

            var directive;
            var scope;
            var $httpBackend;
            var $location;
            var $window;
            var form;
            var formScope;
            beforeEach(function(){
                angular.module('TestModule', ['amRegisterModule'])
                    .controller('TestCtrl', function($scope){
                        $scope.errorFormatter = function(data){
                            return {title:data.title, description:data.description};
                        };
                    });
                module('TestModule');
            });

            beforeEach(inject(function ($compile, $rootScope, $injector) {
                directive = $compile(template)($rootScope.$new());
                scope = directive.scope();
                scope.email = 'test@test.com';
                scope.password = 'testing';
                form = $(directive).find('#register-form');
                formScope = angular.element(form).scope();

                $httpBackend = $injector.get('$httpBackend');
                $location = $injector.get('$location');
                $window = $injector.get('$window');
                scope.$digest();
            }));

            it('Compile the directive', function () {
                expect(formScope.successRedirect).toBe('application');
                expect(formScope.forgotRedirect).toBe('forgot');
                expect(formScope.loginRedirect).toBe('login');
                expect(formScope.endpoint).toBe('/register');
            });

            it('Show an error message when there is an invalid email password sent to the server', function () {
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(400,{
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });
                expect(directive.html()).not.toContain('Invalid Parameters were supplied with the request');
                formScope.submit();
                $httpBackend.flush();
                scope.$digest();
                expect(directive.html()).toContain('Invalid Parameters were supplied with the request');
            });

            it('Call error Formatter with data', function () {
                spyOn(scope, 'errorFormatter').andCallThrough();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(400,{
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });

                formScope.submit();
                $httpBackend.flush();
                expect(scope.errorFormatter).toHaveBeenCalledWith({
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });
            });
        });
    });
});


