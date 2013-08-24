define(function () {
    'use strict';

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