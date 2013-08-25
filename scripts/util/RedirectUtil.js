define(function () {
    'use strict';

    function RedirectUtil($location) {
        this.init = function ($scope) {

            /**
             * Update scope variables if the search params change.
             */
            $scope.$watch(function () {
                return $location.search();
            }, function () {
                resetText();
                if ($location.search().hasOwnProperty('email')) {
                    $scope.email = $location.search().email;
                }
                if ($location.search().hasOwnProperty('token')) {
                    $scope.token = $location.search().token;
                }
            });

            function resetText() {
                $scope.text.success = null;
                $scope.text.error = null;
            }

            /**
             * Reset view success/error messages if the hash changes.
             */
            $scope.$watch(function () {
                return $location.hash();
            }, function () {
                resetText();
            });

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


