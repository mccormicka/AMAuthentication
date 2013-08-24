define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/register/RegisterController');

    var errorFormatter = require('scripts/util/ResponseFormatter');
    var RedirectUtil = require('scripts/util/RedirectUtil');


    describe('RegisterController Tests', function () {

        var $http;
        var $httpBackend;
        var $window;
        var $location;
        var scope;
        var redirectUtil;

        beforeEach(inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            scope.loginRedirect = 'login';
            scope.forgotRedirect = 'forgot';
            scope.endpoint = '/register';
            scope.email = 'test@test.com';
            scope.password = 'testing';
            scope.successRedirect = 'application';
            $http = $injector.get('$http');
            $httpBackend = $injector.get('$httpBackend');
            $location = $injector.get('$location');
            $window = {
                location: {
                    href: ''
                }
            };
            redirectUtil = new RedirectUtil($location);
        }));

        describe('SHOULD', function () {

            it('Post username and password to the server on submit', function () {
                var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(200);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe(scope.successRedirect);
            });

            it('Set scope error when an invalid username and password are sent to the server on submit', function () {
                var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(403);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({
                    title: 'Error!',
                    description: 'Server responded with an Error'
                });
            });

            it('Set scope error when an invalid username and password are sent to the server on submit', function () {
                var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(400, {
                    'title': 'api.error.invalid.params',
                    'description': 'Invalid Parameters were supplied with the request'
                });
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({ title: 'api.error.invalid.params', description: 'Invalid Parameters were supplied with the request' });
            });

            it('Set error text on a 404', function () {
                var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(404);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({
                    title: 'Error!',
                    description: 'Server responded with an Error'
                });
            });

            it('Use an error formatter if present', function () {
                scope.errorFormatter = function () {
                    return {
                        title: 'formatted',
                        description: 'formatted Description'
                    };
                };

                var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/register', {email: 'test@test.com', password: 'testing'}).respond(404);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({ title : 'formatted', description : 'formatted Description' });
            });

        });

        describe('SHOULD NOT', function () {

        });
    });
});