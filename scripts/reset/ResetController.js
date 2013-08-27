define(function () {
    'use strict';

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
