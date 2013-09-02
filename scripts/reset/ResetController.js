define(function (require) {
    'use strict';

    var _ = require('lodash');

    //-------------------------------------------------------------------------
    //
    // Public Methods
    //
    //-------------------------------------------------------------------------

    function localizeText($scope) {
        $scope.text = _.defaults($scope.text || {}, {
            title: 'Reset',
            submit: 'Submit',
            loginLink: 'Forgot Your Password?',
            registerLink: 'Create An Account',
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
