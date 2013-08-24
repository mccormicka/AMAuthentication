define(function () {
    'use strict';

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
                    $scope.text.success = $scope.successFormatter && $scope.successFormatter(data) || responseFormatter.formatSuccess(data);
                })
                .error(function (data) {
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    $scope.text.error = $scope.errorFormatter && $scope.errorFormatter(data) || responseFormatter.formatError(data);
                });
        };
    }

    Controller.$inject = [ '$scope', '$http', 'responseFormatter', 'redirectUtil'];
    return Controller;
});


