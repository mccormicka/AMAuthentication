define(function (require) {
    'use strict';

    var _ = require('lodash');

    //-------------------------------------------------------------------------
    //
    // Private Methods
    //
    //-------------------------------------------------------------------------

    function localizeText($scope) {
        $scope.text = _.defaults($scope.text || {}, {
            title: 'Login',
            submit: 'Submit',
            forgotLink: 'Forgot Your Password?',
            registerLink: 'Create An Account',
            email: {
                title: 'Email',
                placeholder: '@email',
                invalidTitle: 'Invalid Email!',
                invalidDescription: 'You must provide a valid email address'
            },
            password: {
                title: 'Password',
                placeholder: 'Password',
                invalidTitle: 'Invalid Password!',
                invalidLength: 'Must be at least 6 characters long',
                invalidDescription: 'You must provide a password'
            }
        });
    }

    //-------------------------------------------------------------------------
    //
    // Public Methods
    //
    //-------------------------------------------------------------------------

    function Controller($scope, $http, $window, responseFormatter, redirectUtil) {
        $scope.loading = false;
        localizeText($scope);

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