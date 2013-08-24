define(function (require) {
    'use strict';

    require('angular-mocks');
    var Test = require('scripts/forgot/ForgotController');

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
            scope.endpoint = '/forgot';
            scope.email = 'forgot@forgot.com';
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

        it('Post email to the server on submit', function () {
            var controller = new Test(scope, $http, errorFormatter, redirectUtil);
            expect(controller).toBeDefined();
            $httpBackend.expectPOST('/forgot', {email: 'forgot@forgot.com'}).respond(200);
            scope.submit();
            $httpBackend.flush();
            expect(scope.text.success).toEqual({ title: 'Success!', description: 'Successfully completed request' });
        });

        it('Set error text on error response from the server', function () {
            var controller = new Test(scope, $http, errorFormatter, redirectUtil);
            expect(controller).toBeDefined();
            $httpBackend.expectPOST('/forgot', {email: 'forgot@forgot.com'}).respond(404);
            scope.submit();
            $httpBackend.flush();
            expect(scope.text.error).toEqual({ title : 'Error!', description : 'Server responded with an Error' });
        });
    });
});
