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
            title: 'Forgot Password',
            submit: 'Submit',
            registerLink: 'Create an Account',
            loginLink: 'Sign In',
            email: {
                title: 'Email',
                placeholder: '@email',
                invalidTitle: 'Invalid Email!',
                invalidDescription: 'You must provide a valid email address'
            }
        });
    }

    //-------------------------------------------------------------------------
    //
    // Public Methods
    //
    //-------------------------------------------------------------------------

    function Controller($scope, $http, responseFormatter, redirectUtil) {
        $scope.loading = false;
        localizeText($scope);

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


