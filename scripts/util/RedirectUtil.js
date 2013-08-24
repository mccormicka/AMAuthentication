define(function () {
    'use strict';

    function RedirectUtil($location){
        this.init = function($scope){
            if ($location.search().hasOwnProperty('email')) {
                $scope.email = $location.search().email;
            }

            $scope.register = function () {
                $location.hash($scope.registerRedirect);
            };

            $scope.forgot = function () {
                $location.hash($scope.forgotRedirect);
            };

            $scope.login = function () {
                $location.hash($scope.loginRedirect);
            };
        };
    }
    RedirectUtil.$inject = ['$location'];
    return RedirectUtil;
});


