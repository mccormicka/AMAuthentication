
define('text!scripts/login/LoginTemplate.html',[],function () { return '<div class="well span4">\n    <!-- START LOGIN FORM -->\n    <form id="login-form" class="" method="post" novalidate name="loginForm" ng-submit="submit()">\n        <h1>Login</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="login-email">Email</label>\n        <input id="login-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error"\n             ng-show="loginForm.email.$dirty && (loginForm.email.$invalid || loginForm.email.$error.required)">\n            <strong>Invalid Email!</strong><br/>You must provide a valid email address\n        </div>\n\n        <!-- PASSWORD -->\n\n        <label for="login-password">Password</label>\n        <input id="login-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n\n        <div class="alert alert-error"\n             ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error"\n             ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n        <div class="clear-fix"></div>\n        <button id="login-submit" type="submit" class="btn btn-primary" ng-disabled="loading || loginForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="forgot()" ng-show="forgotRedirect" id="login-forgot-password">Forgot Your Password?</a>\n        <a href="" ng-click="register()" ng-show="registerRedirect" id="login-create-account">Create An Account</a>\n    </form>\n    <!-- END LOGIN FORM -->\n</div>';});

define('scripts/login/LoginController',[],function () {
    

    function Controller($scope, $http, $window, responseFormatter, redirectUtil) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Submit'
        };
        redirectUtil.init($scope);

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
                    var message = $scope.errorFormatter && $scope.errorFormatter({value:data}) || responseFormatter.formatError(data);
                    $scope.text.error = {
                        title: message.title,
                        description: message.description
                    };
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$window', 'responseFormatter', 'redirectUtil'];
    return Controller;
});
define('scripts/login/LoginDirective',['require','text!scripts/login/LoginTemplate.html','scripts/login/LoginController'],function (require) {
    

    function Directive() {
        return {
            replace:true,
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



define('scripts/util/RedirectUtil',[],function () {
    

    function RedirectUtil($location) {
        this.init = function ($scope) {

            /**
             * Update scope variables if the search params change.
             */
            $scope.$watch(function () {
                return $location.search();
            }, function () {
                resetText();
                if ($location.search().hasOwnProperty('email')) {
                    $scope.email = $location.search().email;
                }
                if ($location.search().hasOwnProperty('token')) {
                    $scope.token = $location.search().token;
                }
            });

            function resetText() {
                $scope.text.success = null;
                $scope.text.error = null;
            }

            /**
             * Reset view success/error messages if the hash changes.
             */
            $scope.$watch(function () {
                return $location.hash();
            }, function () {
                resetText();
            });

            $scope.register = function () {
                $location.hash($scope.registerRedirect);
            };

            $scope.forgot = function () {
                $location.hash($scope.forgotRedirect);
            };

            $scope.login = function () {
                $location.hash($scope.loginRedirect);
            };
        };
    }

    RedirectUtil.$inject = ['$location'];
    return RedirectUtil;
});



define('scripts/login/LoginModule',['require','angular','scripts/login/LoginDirective','scripts/util/ResponseFormatter','scripts/util/RedirectUtil'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amLoginModule', [])
        .directive('amLogin', require('scripts/login/LoginDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});



define('text!scripts/register/RegisterTemplate.html',[],function () { return '<div class="well span4">\n    <!-- START REGISTRATION FORM -->\n    <form id="register-form" class="" method="post" novalidate name="registerForm" ng-submit="submit()">\n        <h1>Register</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="register-email">Email</label>\n        <input id="register-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error"\n             ng-show="registerForm.email.$dirty && (registerForm.email.$invalid || registerForm.email.$error.required)">\n            <strong>Invalid Email!</strong><br/>You must provide a valid email address\n        </div>\n\n        <!-- PASSWORD -->\n\n        <label for="register-password">Password</label>\n        <input id="register-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n        <div class="alert alert-error" ng-show="registerForm.password.$invalid && registerForm.password.$dirty && registerForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error" ng-show="registerForm.password.$invalid && registerForm.password.$dirty && registerForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n        <div class="clear-fix"></div>\n        <button id="register-submit" type="submit" class="btn btn-primary" ng-disabled="loading || registerForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="forgot()" ng-show="forgotRedirect" id="register-forgot-password">Forgot Your Password?</a>\n        <a href="" ng-click="login()" ng-show="loginRedirect" id="register-create-account">Sign In</a>\n    </form>\n    <!-- END REGISTRATION FORM -->\n</div>';});

define('scripts/register/RegisterController',[],function () {
    

    function Controller($scope, $http, $window, responseFormatter, redirectUtil) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Sign Up'
        };

        redirectUtil.init($scope);

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
                    $scope.text.error = $scope.errorFormatter && $scope.errorFormatter({value:data}) || responseFormatter.formatError(data);
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$window', 'responseFormatter', 'redirectUtil'];
    return Controller;
});
define('scripts/register/RegisterDirective',['require','text!scripts/register/RegisterTemplate.html','scripts/register/RegisterController'],function (require) {
    

    function Directive() {
        return {
            replace:true,
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
define('scripts/register/RegisterModule',['require','angular','scripts/register/RegisterDirective','scripts/util/ResponseFormatter','scripts/util/RedirectUtil'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amRegisterModule', [])
        .directive('amRegister', require('scripts/register/RegisterDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});



define('text!scripts/forgot/ForgotTemplate.html',[],function () { return '<div class="well span4">\n    <!-- START FORGOT PASSWORD FORM -->\n    <form ng-hide="text.success" id="forgot-form" class="" method="post" novalidate name="forgotForm" ng-submit="submit()">\n        <h1>Forgot Password</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="forgot-email">Email</label>\n        <input id="forgot-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error"\n             ng-show="forgotForm.email.$dirty && (forgotForm.email.$invalid || forgotForm.email.$error.required)">\n            <strong>Invalid Email!</strong><br/>You must provide a valid email address\n        </div>\n        <div class="clear-fix"></div>\n        <button id="forgot-submit" type="submit" class="btn btn-primary" ng-disabled="loading || forgotForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="register()" ng-show="registerRedirect">Create an Account</a>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </form>\n\n    <div class="alert alert-success" ng-show="text.success">\n        <strong>{{text.success.title}}</strong><br/>{{text.success.description}}<br/>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </div>\n    <!-- END FORGOT PASSWORD FORM -->\n</div>';});

define('scripts/forgot/ForgotController',[],function () {
    

    function Controller($scope, $http, responseFormatter, redirectUtil) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Submit'
        };
        redirectUtil.init($scope);

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.success = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post($scope.endpoint, {email: $scope.email})
                .success(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.success = $scope.successFormatter && $scope.successFormatter({value:data}) || responseFormatter.formatSuccess(data);
                })
                .error(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.error = $scope.errorFormatter && $scope.errorFormatter({value:data}) || responseFormatter.formatError(data);
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', 'responseFormatter', 'redirectUtil'];
    return Controller;
});



define('scripts/forgot/ForgotDirective',['require','text!scripts/forgot/ForgotTemplate.html','scripts/forgot/ForgotController'],function (require) {
    

    function Directive() {
        return {
            replace:true,
            scope: {
                email: '=',
                loginRedirect: '@',
                forgotRedirect: '@',
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



define('scripts/forgot/ForgotModule',['require','angular','scripts/forgot/ForgotDirective','scripts/util/ResponseFormatter','scripts/util/RedirectUtil'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amForgotModule', [])
        .directive('amForgot', require('scripts/forgot/ForgotDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});



define('text!scripts/reset/ResetTemplate.html',[],function () { return '<div class="well span4">\n    <!-- START RESET PASSWORD FORM -->\n    <form ng-hide="text.success" id="reset-form" class="" method="post" novalidate name="resetForm" ng-submit="submit()">\n        <h1>Change Password</h1>\n        <hr/>\n        <!-- PASSWORD -->\n\n        <label for="reset-password">Password</label>\n        <input id="reset-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n\n        <div class="alert alert-error"\n             ng-show="resetForm.password.$invalid && resetForm.password.$dirty && resetForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error"\n             ng-show="resetForm.password.$invalid && resetForm.password.$dirty && resetForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n        <div class="clear-fix"></div>\n        <button id="reset-submit" type="submit" class="btn btn-primary" ng-disabled="loading || resetForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="register()" ng-show="registerRedirect">Create an Account</a>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </form>\n\n    <div class="alert alert-success" ng-show="text.success">\n        <strong>{{text.success.title}}</strong><br/>{{text.success.description}}<br/>\n        <a href="" ng-click="login()" ng-show="loginRedirect" >Sign In</a>\n    </div>\n    <!-- END RESET PASSWORD FORM -->\n</div>';});

define('scripts/reset/ResetController',[],function () {
    

    function Controller($scope, $http, $window, responseFormatter, redirectUtil) {
        $scope.loading = false;
        $scope.text = {
            submit: 'Submit'
        };

        redirectUtil.init($scope);

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.success = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post($scope.endpoint, {email:$scope.email, password: $scope.password, token:$scope.token})
                .success(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    if($scope.successRedirect){
                        $window.location.href = $scope.successRedirect;
                    }else{
                        $scope.text.success = $scope.successFormatter && $scope.successFormatter({value:data}) || responseFormatter.formatSuccess(data);
                    }
                })
                .error(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.error = $scope.errorFormatter && $scope.errorFormatter({value:data}) || responseFormatter.formatError(data);
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', '$window', 'responseFormatter', 'redirectUtil'];
    return Controller;
});

define('scripts/reset/ResetDirective',['require','text!scripts/reset/ResetTemplate.html','scripts/reset/ResetController'],function (require) {
    

    function Directive() {
        return {
            replace:true,
            scope: {
                loginRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&',
                successFormatter:'&',
                successRedirect:'@'
            },
            template: require('text!scripts/reset/ResetTemplate.html'),
            controller: require('scripts/reset/ResetController')
        };
    }

    return Directive;
});

define('scripts/reset/ResetModule',['require','angular','scripts/reset/ResetDirective','scripts/util/ResponseFormatter','scripts/util/RedirectUtil'],function (require) {
    

    var angular = require('angular');
    var module = angular.module('amResetModule', [])
        .directive('amReset', require('scripts/reset/ResetDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});

define('text!scripts/panel/AuthPanelTemplate.html',[],function () { return '<div>\n    <!-- START AUTH FORM -->\n    <div am-login\n         ng-show="$parent.login"\n         class="login-container"\n         email="email"\n         password="password"\n         success-redirect="{{loginSuccess}}"\n         forgot-redirect="{{forgotRedirect}}"\n         register-redirect="{{registerRedirect}}"\n         endpoint="{{loginEndpoint}}"\n         error-formatter="loginErrorFormatter({value:value})"\n            >\n    </div>\n    <div am-register\n         ng-show="$parent.register"\n         class="register-container"\n         email="email"\n         password="password"\n         success-redirect="{{registerSuccess}}"\n         forgot-redirect="{{forgotRedirect}}"\n         login-redirect="{{loginRedirect}}"\n         endpoint="{{registerEndpoint}}"\n         error-formatter="registerErrorFormatter({value:value})"\n            >\n    </div>\n\n    <div am-forgot\n         ng-show="$parent.forgot"\n         class="forgot-container"\n         email="email"\n         forgot-redirect="{{forgotRedirect}}"\n         success-formatter="forgotSuccessFormatter({value:value})"\n         register-redirect="{{registerRedirect}}"\n         login-redirect="{{loginRedirect}}"\n         endpoint="{{forgotEndpoint}}"\n         error-formatter="forgotErrorFormatter({value:value})"\n            >\n    </div>\n\n    <div am-reset\n         ng-show="$parent.reset"\n         class="reset-container"\n         success-redirect="{{resetSuccess}}"\n         register-redirect="{{registerRedirect}}"\n         login-redirect="{{loginRedirect}}"\n         endpoint="{{resetEndpoint}}"\n         error-formatter="resetErrorFormatter({value:value})"\n            >\n    </div>\n    <!-- END AUTH FORM -->\n</div>';});

define('scripts/panel/AuthPanelController',[],function () {
    

    function Controller($scope, $location) {
        $scope.loading = false;
        //Set the login screen as the default view.
        $scope.login = true;
        $scope.register = false;
        $scope.forgot = false;
        $scope.reset = false;

        /**
         * Update the view whenever the hash changes and matches one of our views.
         */
        $scope.$watch(function () {
            return $location.hash();
        }, updateView);

        /**
         * Emails garbles hashes so we need to provide a mechanism to update
         * the view with search params also.
         */
        $scope.$watch(function(){
            return $location.search();
        }, function(value){
            if(value[$scope.searchParam]){
                updateView(value[$scope.searchParam]);
            }
        });

        //-------------------------------------------------------------------------
        //
        // Private Methods
        //
        //-------------------------------------------------------------------------

        function resetViews() {
            //Reset all views to false
            $scope.login = $scope.register = $scope.forgot = $scope.reset  = false;
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
            case $scope.resetRedirect:
                resetViews();
                $scope.reset = true;
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
            replace: true,
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
                forgotSuccessFormatter: '&',
                forgotErrorFormatter: '&',
                //Reset
                resetRedirect: '@',
                resetEndpoint: '@',
                resetSuccess: '@',
                resetErrorFormatter: '&',

                searchParam: '@'
            },
            template: require('text!scripts/panel/AuthPanelTemplate.html'),
            controller: require('scripts/panel/AuthPanelController'),
            link: function ($scope, iElement, $attrs) {
                //Setup a default value if none specified
                $attrs.$observe('searchParam', function (val) {
                    $scope.searchParam = val ? val : 'amauth';
                });
            }
        };
    }

    return Directive;
});
define('scripts/panel/AuthPanelModule',['require','scripts/login/LoginModule','scripts/register/RegisterModule','scripts/forgot/ForgotModule','scripts/reset/ResetModule','angular','scripts/panel/AuthPanelDirective'],function (require) {
    

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/forgot/ForgotModule');
    require('scripts/reset/ResetModule');

    var angular = require('angular');
    var module = angular.module('amAuthPanelModule', [
            'amLoginModule',
            'amForgotModule',
            'amRegisterModule',
            'amResetModule'
        ])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));

    return module;
});



define('am-authentication',['require','scripts/panel/AuthPanelModule','angular'],function (require) {
    

    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    angular.module('am.authentication', [
        'amAuthPanelModule'
    ]);
});

