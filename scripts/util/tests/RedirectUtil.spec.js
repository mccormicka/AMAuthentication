define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/util/RedirectUtil');

    describe('RedirectUtil Tests', function () {

        var $location;
        var scope;
        var redirectUtil;

        beforeEach(inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            scope.loginRedirect = 'login';
            scope.registerRedirect = 'register';
            scope.forgotRedirect = 'forgot';
            scope.email = 'test@test.com';
            scope.password = 'testing';
            scope.text = {};
            $location = $injector.get('$location');
            redirectUtil = new Test($location);

        }));

        describe('SHOULD', function () {
            it('parse an email address if found in the url', function () {
                redirectUtil.init(scope);
                $location.search({email: 'updated@updated.com'});
                scope.$digest();
                expect(scope.email).toBe('updated@updated.com');
            });


            it('parse a token if found in the url', function () {
                redirectUtil.init(scope);
                $location.search({token: '1234567'});
                scope.$digest();
                expect(scope.token).toBe('1234567');
            });

            it('When calling register should update the hash', function () {
                spyOn($location, 'hash').andCallFake(function (value) {
                    expect(value).toBe('register');
                });
                redirectUtil.init(scope);
                scope.register();
                expect($location.hash).toHaveBeenCalled();
            });

            it('When calling forgot should update the hash', function () {
                spyOn($location, 'hash').andCallFake(function (value) {
                    expect(value).toBe('forgot');
                });
                redirectUtil.init(scope);
                scope.forgot();
                expect($location.hash).toHaveBeenCalled();
            });

            it('When calling login should update the hash', function () {
                spyOn($location, 'hash').andCallFake(function (value) {
                    expect(value).toBe('login');
                });
                redirectUtil.init(scope);
                scope.login();
                expect($location.hash).toHaveBeenCalled();
            });
        });
    });
});