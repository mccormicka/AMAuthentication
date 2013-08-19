define(function () {
    'use strict';

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
            $http.post($scope.endpoint, {email: $scope.email, password: $scope.password})
                .success(function () {
                    $window.location.href = $scope.successRedirect;
                })
                .error(function(data){
                    $scope.text.submit = 'Submit';
                    $scope.loading = false;
                    if(data && data.key && data.description){
                        $scope.text.error = {
                            title:data.key,
                            description:data.description
                        };
                    }
                });
        };
    }
    LoginController.$inject = [ '$scope', '$http', '$location', '$window'];
    return LoginController;
});


