
define('text!scripts/login/LoginTemplate.html',[],function () { return '<!-- START LOGIN FORM -->\n<div class="well span4">\n    <form id="login-form" class="" method="post" novalidate name="loginForm" ng-submit="submit()">\n        <h1>Login</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="login-email">Email</label>\n        <input id="login-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error"\n             ng-show="loginForm.email.$invalid && loginForm.email.$dirty && loginForm.email.$error.required">\n            <strong>Invalid Email!</strong><br/>You must provide an email\n        </div>\n\n        <!-- PASSWORD -->\n\n        <label for="login-password">Password</label>\n        <input id="login-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n\n        <div class="alert alert-error"\n             ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error"\n             ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n\n        <button id="login-submit" type="submit" class="btn btn-primary" ng-disabled="loading || loginForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="forgot()" ng-show="forgotRedirect" id="login-forgot-password">Forgot Your Password?</a>\n        <a href="" ng-click="register()" ng-show="registerRedirect" id="login-create-account">Create An Account</a>\n    </form>\n</div>\n<!-- END LOGIN FORM -->';});

define('scripts/login/LoginController',[],function () {
    

    function Controller($scope, $http, $location, $window, responseFormatter) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Submit'
        };

        if ($location.search().hasOwnProperty('email')) {
            $scope.email = $location.search().email;
        }

        $scope.register = function () {
            $location.hash($scope.registerRedirect);
        };

        $scope.forgot = function () {
            $location.hash($scope.forgotRedirect);
        };

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post($scope.endpoint, {email: $scope.email, password: $scope.password})
                .success(function () {
                    $window.location.href = $scope.successRedirect;
                })
                .error(function (data) {

                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    var message = $scope.errorFormatter && $scope.errorFormatter(data) || responseFormatter.formatError(data);
                    $scope.text.error = {
                        title: message.title,
                        description: message.description
                    };
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$location', '$window', 'responseFormatter'];
    return Controller;
});



define('scripts/login/LoginDirective',['require','text!scripts/login/LoginTemplate.html','scripts/login/LoginController'],function (require) {
    

    function Directive() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&'
            },
            template: require('text!scripts/login/LoginTemplate.html'),
            controller: require('scripts/login/LoginController')
        };
    }

    return Directive;
});



define('scripts/util/ResponseFormatter',[],function () {
    

    function invalidData(data) {
        return !data || !data.title || !data.description;
    }

    return{

        /**
         * Formats a success response with a default message if
         * the data does not contain title/description attributes.
         * @param data
         * @returns {*}
         */
        formatSuccess: function(data){
            if (invalidData(data)) {
                data = {
                    title: 'Success!',
                    description: 'Successfully completed request'
                };
            }
            return data;
        },

        /**
         * Formats an error response with a default message if
         * the data does not contain title/description attributes.
          * @param data
         * @returns {*}
         */
        formatError: function (data) {
            if (invalidData(data)) {
                data = {
                    title: 'Error!',
                    description: 'Server responded with an Error'
                };
            }
            return data;
        }
    };
});



define('scripts/login/LoginModule',['require','angular','scripts/login/LoginDirective','scripts/util/ResponseFormatter'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amLoginModule', [])
        .directive('amLogin', require('scripts/login/LoginDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'));

    return module;
});



define('text!scripts/register/RegisterTemplate.html',[],function () { return '<!-- START REGISTRATION FORM -->\n<div class="well span4">\n    <form id="register-form" class="" method="post" novalidate name="registerForm" ng-submit="submit()">\n        <h1>Register</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="register-email">Email</label>\n        <input id="register-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error" ng-show="registerForm.email.$invalid && registerForm.email.$dirty && registerForm.email.$error.required">\n            <strong>Invalid Email!</strong><br/>You must provide an email\n        </div>\n\n        <!-- PASSWORD -->\n\n        <label for="register-password">Password</label>\n        <input id="register-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n        <div class="alert alert-error" ng-show="registerForm.password.$invalid && registerForm.password.$dirty && registerForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error" ng-show="registerForm.password.$invalid && registerForm.password.$dirty && registerForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n\n        <button id="register-submit" type="submit" class="btn btn-primary" ng-disabled="loading || registerForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="forgot()" ng-show="forgotRedirect" id="register-forgot-password">Forgot Your Password?</a>\n        <a href="" ng-click="login()" ng-show="loginRedirect" id="register-create-account">Sign In</a>\n    </form>\n</div>\n<!-- END REGISTRATION FORM -->';});

define('scripts/register/RegisterController',[],function () {
    

    function Controller($scope, $http, $location, $window, responseFormatter) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Sign Up'
        };

        if ($location.search().hasOwnProperty('email')) {
            $scope.email = $location.search().email;
        }

        $scope.login = function () {
            $location.hash($scope.loginRedirect);
        };

        $scope.forgot = function () {
            $location.hash($scope.forgotRedirect);
        };

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post($scope.endpoint, {email: $scope.email, password: $scope.password})
                .success(function () {
                    $window.location.href = $scope.successRedirect;
                })
                .error(function (data) {

                    $scope.text.submit = 'Submit';
                    $scope.loading = false;

                    var message = $scope.errorFormatter && $scope.errorFormatter(data) || responseFormatter.formatError(data);
                    $scope.text.error = {
                        title: message.title,
                        description: message.description
                    };
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$location', '$window', 'responseFormatter'];
    return Controller;
});
define('scripts/register/RegisterDirective',['require','text!scripts/register/RegisterTemplate.html','scripts/register/RegisterController'],function (require) {
    

    function Directive() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                loginRedirect: '@',
                endpoint: '@',
                errorFormatter:'&'
            },
            template: require('text!scripts/register/RegisterTemplate.html'),
            controller: require('scripts/register/RegisterController')
        };
    }

    return Directive;
});
define('scripts/register/RegisterModule',['require','angular','scripts/register/RegisterDirective','scripts/util/ResponseFormatter'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amRegisterModule', [])
        .directive('amRegister', require('scripts/register/RegisterDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'));

    return module;
});



define('text!scripts/forgot/ForgotTemplate.html',[],function () { return '<!-- START FORGOT PASSWORD FORM -->\n<div class="well span4">\n    <form ng-hide="text.success" id="forgot-form" class="" method="post" novalidate name="forgotForm" ng-submit="submit()">\n        <h1>Forgot Password</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="forgot-email">Email</label>\n        <input id="forgot-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error" ng-show="forgotForm.email.$invalid && forgotForm.email.$dirty && forgotForm.email.$error.required">\n            <strong>Invalid Email!</strong><br/>You must provide an email\n        </div>\n\n        <button id="forgot-submit" type="submit" class="btn btn-primary" ng-disabled="loading || forgotForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="register()" ng-show="registerRedirect">Create an Account</a>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </form>\n\n    <div class="alert alert-success" ng-show="text.success">\n        <strong>{{text.success.title}}</strong><br/>{{text.success.description}}<br/>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </div>\n\n</div>\n<!-- END FORGOT PASSWORD FORM -->';});

define('scripts/forgot/ForgotController',[],function () {
    

    function Controller($scope, $http, $location, responseFormatter) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Submit'
        };

        if ($location.search().hasOwnProperty('email')) {
            $scope.email = $location.search().email;
        }

        $scope.register = function () {
            $location.hash($scope.registerRedirect);
        };

        $scope.login = function () {
            $location.hash($scope.loginRedirect);
        };

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.success = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post($scope.endpoint, {email: $scope.email, password: $scope.password})
                .success(function (data) {
                    $scope.text.success = $scope.successFormatter && $scope.successFormatter(data) || responseFormatter.formatSuccess(data);
                })
                .error(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.error = $scope.errorFormatter && $scope.errorFormatter(data) || responseFormatter.formatError(data);
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$location', 'responseFormatter'];
    return Controller;
});



define('scripts/forgot/ForgotDirective',['require','text!scripts/forgot/ForgotTemplate.html','scripts/forgot/ForgotController'],function (require) {
    

    function Directive() {
        return {
            scope: {
                email: '=',
                successRedirect: '@',
                loginRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&',
                successFormatter:'&'
            },
            template: require('text!scripts/forgot/ForgotTemplate.html'),
            controller: require('scripts/forgot/ForgotController')
        };
    }

    return Directive;
});



define('scripts/forgot/ForgotModule',['require','angular','scripts/forgot/ForgotDirective','scripts/util/ResponseFormatter'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amForgotModule', [])
        .directive('amForgot', require('scripts/forgot/ForgotDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'));

    return module;
});



define('text!scripts/panel/AuthPanelTemplate.html',[],function () { return '<!-- START AUTH FORM -->\n<div am-login\n     ng-show="$parent.login"\n     class="login-container"\n     email="email"\n     password="password"\n     success-redirect="{{loginSuccess}}"\n     forgot-redirect="{{forgotRedirect}}"\n     register-redirect="{{registerRedirect}}"\n     endpoint="{{loginEndpoint}}"\n     error-formatter="loginErrorFormatter(value)"\n        >\n</div>\n<div am-register\n     ng-show="$parent.register"\n     class="register-container"\n     email="email"\n     password="password"\n     success-redirect="{{registerSuccess}}"\n     forgot-redirect="{{forgotRedirect}}"\n     login-redirect="{{loginRedirect}}"\n     endpoint="{{registerEndpoint}}"\n     error-formatter="registerErrorFormatter(value)"\n        >\n</div>\n\n<div am-forgot\n     ng-show="$parent.forgot"\n     class="forgot-container"\n     email="email"\n     success-redirect="{{forgotSuccess}}"\n     register-redirect="{{registerRedirect}}"\n     login-redirect="{{loginRedirect}}"\n     endpoint="{{forgotEndpoint}}"\n     error-formatter="forgotErrorFormatter(value)"\n        >\n</div>\n\n<!-- END AUTH FORM -->';});

define('scripts/panel/AuthPanelController',[],function () {
    

    function Controller($scope, $location) {
        $scope.loading = false;
        //Set the login screen as the default view.
        $scope.login = true;
        $scope.register = false;

        /**
         * Update the view whenever the hash changes and matches one of our views.
         */
        $scope.$watch(function () {
            return $location.hash();
        }, updateView);

        //-------------------------------------------------------------------------
        //
        // Private Methods
        //
        //-------------------------------------------------------------------------

        function resetViews() {
            //Reset all views to false
            $scope.login = $scope.register = $scope.forgot = false;
        }

        function updateView(newValue) {
            switch (newValue) {
            case $scope.loginRedirect:
                resetViews();
                $scope.login = true;
                break;
            case $scope.registerRedirect:
                resetViews();
                $scope.register = true;
                break;
            case $scope.forgotRedirect:
                resetViews();
                $scope.forgot = true;
                break;
            }
        }
    }

    Controller.$inject = ['$scope', '$location'];
    return Controller;
});



define('scripts/panel/AuthPanelDirective',['require','text!scripts/panel/AuthPanelTemplate.html','scripts/panel/AuthPanelController'],function (require) {
    

    function Directive() {
        return {
            scope: {
                email: '=',
                password: '=',
                //Login
                loginRedirect: '@',
                loginSuccess: '@',
                loginEndpoint: '@',
                loginErrorFormatter: '&',
                //Register
                registerRedirect: '@',
                registerEndpoint: '@',
                registerSuccess: '@',
                registerErrorFormatter: '&',
                //Forgot
                forgotRedirect: '@',
                forgotEndpoint: '@',
                forgotSuccess: '@',
                forgotErrorFormatter: '&'
            },
            template: require('text!scripts/panel/AuthPanelTemplate.html'),
            controller: require('scripts/panel/AuthPanelController')
        };
    }

    return Directive;
});
define('scripts/panel/AuthPanelModule',['require','angular','scripts/panel/AuthPanelDirective'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amAuthPanelModule', [])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));

    return module;
});



define('am-authentication',['require','scripts/login/LoginModule','scripts/register/RegisterModule','scripts/forgot/ForgotModule','scripts/panel/AuthPanelModule','angular'],function (require) {
    

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/forgot/ForgotModule');
    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    angular.module('am.authentication', [
        'amAuthPanelModule',
        'amLoginModule',
        'amForgotModule',
        'amRegisterModule'
    ]);
});

