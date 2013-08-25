define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/reset/ResetController');

    var errorFormatter = require('scripts/util/ResponseFormatter');
    var RedirectUtil = require('scripts/util/RedirectUtil');

    describe('SHOULD', function () {

        var $http;
        var $httpBackend;
        var $window;
        var $location;
        var scope;
        var redirectUtil;

        beforeEach(inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            scope.registerRedirect = 'register';
            scope.forgotRedirect = 'forgot';
            scope.endpoint = '/reset';
            scope.email = 'reset@reset.com';
            scope.token = '12345';
            scope.password = '1234567890';

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

        it('Post password / token to the server on submit', function () {
            var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
            expect(controller).toBeDefined();
            $httpBackend.expectPOST('/reset', {email:'reset@reset.com',password: '1234567890', token:'12345'}).respond(200);
            scope.submit();
            $httpBackend.flush();
            expect(scope.text.success).toEqual({ title: 'Success!', description: 'Successfully completed request' });
        });

        it('Update the window location if a success redirect is set', function () {
            var controller = new Test(scope, $http, $window, errorFormatter, redirectUtil);
            expect(controller).toBeDefined();
            scope.successRedirect = 'application';
            $httpBackend.expectPOST('/reset', {email:'reset@reset.com',password: '1234567890', token:'12345'}).respond(200);
            scope.submit();
            $httpBackend.flush();
            expect($window.location.href).toBe(scope.successRedirect);
        });

        it('Set error text on error response from the server', function () {
            var controller = new Test(scope, $http,$window, errorFormatter, redirectUtil);
            expect(controller).toBeDefined();
            $httpBackend.expectPOST('/reset', {email:'reset@reset.com',password: '1234567890', token:'12345'}).respond(403);
            scope.submit();
            $httpBackend.flush();
            expect(scope.text.error).toEqual({ title : 'Error!', description : 'Server responded with an Error' });
        });
    });
});
