define(function (require) {
    'use strict';

    require('angular-mocks');
    require('scripts/register/RegisterModule');

    describe('Register Directive Tests', function () {
        describe('SHOULD', function () {

            var template = '<div am-register ' +
                'class="register-container" ' +
                'email="email" ' +
                'password="password" ' +
                'success-redirect="application" ' +
                'forgot-redirect="forgot" ' +
                'register-redirect="register" ' +
                'error-formatter="errorFormatter(value)" ' +
                'endpoint="/register" > </div>';

            var directive;
            var scope;
            var $httpBackend;
            var $location;
            var $window;
            beforeEach(function(){
                module('amRegisterModule');
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
                scope.errorFormatter = function(data){
                    return {title:data.title, description:data.description};
                };

                $httpBackend = $injector.get('$httpBackend');
                $location = $injector.get('$location');
                $window = $injector.get('$window');
                scope.$digest();
            }));

            it('Compile the directive', function () {
                expect(scope.successRedirect).toBe('application');
                expect(scope.forgotRedirect).toBe('forgot');
                expect(scope.registerRedirect).toBe('register');
                expect(scope.endpoint).toBe('/register');
            });

            it('Show an error message when there is an invalid email password sent to the server', function () {
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(400,{
                    'title': 'api.error.invalid.params',
                    'status': 400,
                    'description': 'Invalid Parameters were supplied with the request'
                });
                expect(directive.html()).not.toContain('Invalid Parameters were supplied with the request');
                scope.submit();
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
                scope.submit();
                $httpBackend.flush();
                expect(scope.errorFormatter).toHaveBeenCalledWith({
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });
            });
        });
    });
});


