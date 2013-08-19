
define('text!lib/login/template.html',[],function () { return '<!-- START LOGIN FORM -->\n<div class="well span4">\n    <form id="login-form" class="" method="post" novalidate name="loginForm" ng-submit="submit()">\n        <h1>Login</h1>\n        <hr/>\n        <!-- EMAIL -->\n        <label for="login-email">Email</label>\n        <input id="login-email"\n               ng-model="email"\n               name="email"\n               type="email"\n               class="email"\n               placeholder="@email"\n               ng-disabled="loading"\n               ng-required="true"\n                />\n\n        <div class="alert alert-error" ng-show="loginForm.email.$invalid && loginForm.email.$dirty && loginForm.email.$error.required">\n            <strong>Invalid Email!</strong><br/>You must provide an email\n        </div>\n\n        <!-- PASSWORD -->\n\n        <label for="login-password">Password</label>\n        <input id="login-password"\n               ng-model="password"\n               type="password"\n               name="password"\n               class="pass"\n               placeholder="Password"\n               ng-minlength="6"\n               ng-disabled="loading"\n               ng-required="true"\n                >\n        <div class="alert alert-error" ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.minlength">\n            <strong>Invalid Password!</strong><br/>Must be at least 6 characters long\n        </div>\n        <div class="alert alert-error" ng-show="loginForm.password.$invalid && loginForm.password.$dirty && loginForm.password.$error.required">\n            <strong>Invalid Password!</strong><br/>You must provide a password\n        </div>\n\n        <button id="login-submit" type="submit" class="btn btn-primary" ng-disabled="loading || loginForm.$invalid">\n            {{text.submit}}\n        </button>\n        <div class="clear-fix"></div>\n        <div class="alert alert-error" ng-show="text.error">\n            <strong>{{text.error.title}}</strong><br/>{{text.error.description}}\n        </div>\n        <hr/>\n        <a href="" ng-click="forgot()" id="login-forgot-password">Forgot Your Password?</a>\n        <a href="" ng-click="create()" id="login-create-account">Create An Account</a>\n    </form>\n</div>\n<!-- END LOGIN FORM -->';});

define('lib/login/LoginController',[],function () {
    

    function LoginController($scope, $http, $location, $window) {
        $scope.loading = false;
        $scope.text = {
            submit:'Submit'
        };

        if($location.search().hasOwnProperty('email')){
            $scope.email = $location.search().email;
        }

        $scope.create = function(){
            $location.hash($scope.createRedirect);
        };

        $scope.forgot = function(){
            $location.hash($scope.forgotRedirect);
        };

        $scope.submit = function () {
            $scope.text.error = null;
            $scope.text.submit = 'Loading...';
            $scope.loading = true;
            $http.post('/login', {email: $scope.email, password: $scope.password})
                .success(function () {
                    $window.location.href = $scope.successRedirect;
                })
                .error(function(data){
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.error = {
                        title:data.key,
                        description:data.description
                    };
                });
        };
    }
    LoginController.$inject = [ '$scope', '$http', '$location', '$window'];
    return LoginController;
});



define('lib/login/login',['require','text!lib/login/template.html','lib/login/LoginController'],function (require) {
    

    function Login() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                createRedirect: '@'
            },
            template: require('text!lib/login/template.html'),
            controller: require('lib/login/LoginController')
        };
    }

    return Login;
});



define('am-authentication',['require','angular','lib/login/login'],function (require) {
    

    var angular = require('angular');
    angular.module('am.authentication', [])
        .directive('amLogin', require('lib/login/login'));

    return true;
});


