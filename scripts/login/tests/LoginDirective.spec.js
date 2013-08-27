define(function (require) {
    'use strict';

    require('angular-mocks');
    require('scripts/login/LoginModule');

    describe('LoginDirective Tests', function () {
        describe('SHOULD', function () {

            var template = '<div am-login ' +
                'class="login-container" ' +
                'email="email" ' +
                'password="password" ' +
                'success-redirect="application" ' +
                'forgot-redirect="forgot" ' +
                'register-redirect="register" ' +
                'endpoint="/login" > </div>';

            var directive;
            var scope;
            var $httpBackend;
            var $location;
            var $window;
            beforeEach(function(){
                module('amLoginModule');
            });

            beforeEach(inject(function ($compile, $rootScope, $injector) {
                directive = $compile(template)($rootScope.$new());
                scope = directive.scope();
                scope.registerRedirect = 'register';
                scope.forgotRedirect = 'forgot';
                scope.endpoint = '/login';
                scope.email = 'test@test.com';
                scope.password = 'testing';
                scope.successRedirect = 'application';
                $httpBackend = $injector.get('$httpBackend');
                $location = $injector.get('$location');
                $window = $injector.get('$window');
                scope.$digest();
            }));

            it('Compile the directive', function () {
                expect(scope.successRedirect).toBe('application');
                expect(scope.forgotRedirect).toBe('forgot');
                expect(scope.registerRedirect).toBe('register');
                expect(scope.endpoint).toBe('/login');
            });

            iit('Show an error message when there is an invalid email password sent to the server', function () {
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(400,{
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });
                expect(directive.html()).not.toContain('Invalid Parameters were supplied with the request');
                scope.submit();
                $httpBackend.flush();
                scope.$digest();
                expect(directive.html()).toContain('Invalid Parameters were supplied with the request');
            });
        });
    });
});


