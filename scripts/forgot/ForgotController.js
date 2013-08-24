define(function () {
    'use strict';

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


