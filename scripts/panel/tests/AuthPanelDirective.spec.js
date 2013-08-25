define(function (require) {
    'use strict';

    require('angular-mocks');
    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    var $ = require('jquery');


    describe('AuthPanelDirective tests', function () {

        var template = '<div am-auth-panel ' +
            'email="email" ' +
            'password="password" ' +
            'login-success="demologgedin.html" ' +
            'login-endpoint="/login" ' +
            'login-redirect="login" ' +
            'login-error-formatter="errorFormatter(value)" ' +
            'register-success="demologgedin.html" ' +
            'register-endpoint="/register" ' +
            'register-redirect="application" ' +
            'register-error-formatter="errorFormatter(value)" ' +
            'forgot-redirect="forgot" ' +
            'forgot-endpoint="/forgot" ' +
            'forgot-error-formatter="errorFormatter(value)" ' +
            'forgot-success-formatter="successFormatter(value)" ' +
            'reset-redirect="reset" ' +
            'reset-endpoint="/reset" ' +
            'reset-success="forgotSuccess" ' +
            'reset-error-formatter="errorFormatter(value)"> </div>';

        var scope;
        var directive;
        var $httpBackend;

        beforeEach(function(){
            module('amAuthPanelModule');
            inject(function($rootScope, $compile, $injector){
                scope = $rootScope.$new();
                scope.errorFormatter = function(){
                    return {title:'error', description:'error'};
                };
                scope.successFormatter = function(){
                    return {title:'success', description:'success'};
                };
                $httpBackend = $injector.get('$httpBackend');
                directive = $compile(template)(scope);
                scope.$digest();
            });
        });

        it('Compile Directive', function () {
            expect(directive.html()).toContain('login-form');
            expect(directive.html()).toContain('register-form');
            expect(directive.html()).toContain('forgot-form');
            expect(directive.html()).toContain('reset-form');
        });

        it('Call Success Formatter when passed to forgot', function () {
            spyOn(scope, 'successFormatter').andCallThrough();
            $httpBackend.expectPOST('/forgot', {email: 'test@test.com'}).respond(200,{
                'title': 'api.success.ok',
                'description': 'Success'
            });
            var form = $(directive).find('#forgot-form');
            var formScope = angular.element(form).scope();
            formScope.email = 'test@test.com';
            formScope.submit();
            $httpBackend.flush();
            expect(scope.successFormatter).toHaveBeenCalled();
        });

        it('Call Error Formatter when passed to forgot', function () {
            spyOn(scope, 'errorFormatter').andCallThrough();
            $httpBackend.expectPOST('/forgot', {email: 'test2@test.com'}).respond(404,{
                'title': 'api.success.error',
                'description': 'Error'
            });
            var form = $(directive).find('#forgot-form');
            var formScope = angular.element(form).scope();
            formScope.email = 'test2@test.com';
            formScope.submit();
            $httpBackend.flush();
            expect(scope.errorFormatter).toHaveBeenCalled();
        });
    });
});
