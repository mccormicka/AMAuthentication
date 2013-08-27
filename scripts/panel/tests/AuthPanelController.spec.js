define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/panel/AuthPanelController');

    describe('AuthPanelController Tests', function () {

        var $location;
        var scope;
        var hash;
        var search = {};

        beforeEach(inject(function ($rootScope) {
            scope = $rootScope.$new();
            //Login
            scope.loginRedirect = 'loginRedirect';
            scope.loginSuccess = 'loginSuccess';
            scope.loginEndpoint = 'loginEndpoint';
            //register
            scope.registerRedirect = 'registerRedirect';
            scope.registerEndpoint = 'registerEndpoint';
            scope.registerSuccess = 'registerSuccess';
            //forgot
            scope.forgotRedirect = 'forgotRedirect';
            scope.forgotEndpoint = 'forgotEndpoint';
            //Reset
            scope.resetRedirect = 'resetRedirect';
            scope.resetEndpoint = 'resetEndpoint';
            scope.searchParam = 'amauth';

            hash = '';
            search = {};
            $location = {
                hash: function(){
                    return hash;
                },
                search: function(){
                    return search;
                }
            };

        }));

        describe('SHOULD', function () {

            it('Show the login by default', function () {
                var controller = new Test(scope, $location);
                expect(controller).toBeDefined();
                expect(scope.reset).toBe(false);
                expect(scope.login).toBe(true);
                expect(scope.forgot).toBe(false);
                expect(scope.register).toBe(false);
            });

            it('Update the active view when the hash changes to register', function () {
                var controller = new Test(scope, $location);
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = scope.registerRedirect;
                scope.$digest();
                expect(scope.reset).toBe(false);
                expect(scope.login).toBe(false);
                expect(scope.forgot).toBe(false);
                expect(scope.register).toBe(true);
            });

            it('Update the active view when the hash changes to login', function () {
                hash = scope.registerRedirect;
                var controller = new Test(scope, $location);
                scope.$digest();
                expect(controller).toBeDefined();
                expect(scope.login).toBe(false);
                expect(scope.register).toBe(true);
                hash = scope.loginRedirect;
                scope.$digest();
                expect(scope.reset).toBe(false);
                expect(scope.login).toBe(true);
                expect(scope.forgot).toBe(false);
                expect(scope.register).toBe(false);
            });

            it('Update the active view when the hash changes to forgot', function () {
                var controller = new Test(scope, $location);
                scope.$digest();
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = scope.forgotRedirect;
                scope.$digest();
                expect(scope.reset).toBe(false);
                expect(scope.login).toBe(false);
                expect(scope.forgot).toBe(true);
                expect(scope.register).toBe(false);
            });

            it('Update the active view when the hash changes to reset', function () {
                var controller = new Test(scope, $location);
                scope.$digest();
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = scope.resetRedirect;
                scope.$digest();
                expect(scope.reset).toBe(true);
                expect(scope.login).toBe(false);
                expect(scope.forgot).toBe(false);
                expect(scope.register).toBe(false);
            });

            it('Update the active view when the search changes to reset', function () {
                var controller = new Test(scope, $location);
                scope.$digest();
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                search = {amauth:scope.resetRedirect};
                scope.$digest();
                expect(scope.reset).toBe(true);
                expect(scope.login).toBe(false);
                expect(scope.forgot).toBe(false);
                expect(scope.register).toBe(false);
            });
        });

        describe('SHOULD NOT', function () {
            it('Update the active view when the hash changes to an unknown hash', function () {
                var controller = new Test(scope, $location);
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = 'fakehash';
                scope.$digest();
                expect(scope.login).toBe(true);
                expect(scope.register).toBe(false);
            });
        });
    });
});