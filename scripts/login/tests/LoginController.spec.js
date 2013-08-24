define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/login/LoginController');

    var errorFormatter = require('scripts/util/ResponseFormatter');

    describe('LoginController Tests', function () {

        var $http;
        var $httpBackend;
        var $window;
        var $location;
        var scope;

        beforeEach(inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            scope.registerRedirect = 'register';
            scope.forgotRedirect = 'forgot';
            scope.endpoint = '/login';
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

        }));

        describe('SHOULD', function () {
            it('parse an email address if found in the url', function () {
                spyOn($location, 'search').andCallFake(function () {
                    return {email: 'test@test.com'};
                });
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                expect(scope.email).toBe('test@test.com');
                expect($location.search).toHaveBeenCalled();
            });

            it('When calling register should update the hash', function () {

                spyOn($location, 'hash').andCallFake(function (value) {
                    expect(value).toBe('register');
                });
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                scope.register();
                expect($location.hash).toHaveBeenCalled();
            });

            it('When calling forgot should update the hash', function () {

                spyOn($location, 'hash').andCallFake(function (value) {
                    expect(value).toBe('forgot');
                });
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                scope.forgot();
                expect($location.hash).toHaveBeenCalled();
            });

            it('Post username and password to the server on submit', function () {
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(200);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe(scope.successRedirect);
            });

            it('Set scope error when an invalid username and password are sent to the server on submit', function () {
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(403);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({
                    title: 'Error!',
                    description: 'Server responded with an Error'
                });
            });

            it('Set scope error when an invalid username and password are sent to the server on submit', function () {
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(400,{
                    'data': [
                        {
                            'reason': 'incorrect',
                            'field': 'email'
                        },
                        {
                            'reason': 'incorrect',
                            'field': 'password'
                        }
                    ],
                    'title': 'api.error.invalid.params',
                    'code': 40002,
                    'status': 400,
                    'description': 'Invalid Parameters were supplied with the request',
                    'href': '/apierrors/40002',
                    'type': 'apierror'
                });
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({ title : 'api.error.invalid.params', description : 'Invalid Parameters were supplied with the request' });
            });

            it('Set error text on a 404', function () {
                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(404);
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

                var controller = new Test(scope, $http, $location, $window, errorFormatter);
                expect(controller).toBeDefined();
                $httpBackend.expectPOST('/login', {email: 'test@test.com', password: 'testing'}).respond(404);
                scope.submit();
                $httpBackend.flush();
                expect($window.location.href).toBe('');
                expect(scope.text.error).toEqual({ title : 'formatted', description : 'formatted Description' });
            });

        });
    });
});