define(function () {
    'use strict';

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