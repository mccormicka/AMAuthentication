define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/panel/AuthPanelController');

    describe('AuthPanelController Tests', function () {

        var $location;
        var scope;
        var hash;

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
            scope.forgotEndpoint = 'forgotRedirect';

            hash = '';
            $location = {
                hash: function(){
                    return hash;
                }
            };

        }));

        describe('SHOULD', function () {

            it('Show the login by default', function () {
                var controller = new Test(scope, $location);
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
            });

            it('Update the active view when the hash changes to register', function () {
                var controller = new Test(scope, $location);
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = scope.registerRedirect;
                scope.$digest();
                expect(scope.login).toBe(false);
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
                expect(scope.login).toBe(true);
            });

            it('Update the active view when the hash changes to forgot', function () {
                var controller = new Test(scope, $location);
                scope.$digest();
                expect(controller).toBeDefined();
                expect(scope.login).toBe(true);
                hash = scope.forgotRedirect;
                scope.$digest();
                expect(scope.forgot).toBe(true);
            });

            xit('Update the active view when the hash changes to reset', function () {
                expect(false).toBeTruthy();
            });

        });

        describe('SHOULD NOT', function () {
            it('Update the active view when the hash changes to an unknow hash', function () {
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