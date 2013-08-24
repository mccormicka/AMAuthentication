define(function () {
    'use strict';

    function Controller($scope, $location) {
        $scope.loading = false;
        //Set the login screen as the default view.
        $scope.login = true;
        $scope.register = false;

        /**
         * Update the view whenever the hash changes and matches one of our views.
         */
        $scope.$watch(function () {
            return $location.hash();
        }, updateView);

        //-------------------------------------------------------------------------
        //
        // Private Methods
        //
        //-------------------------------------------------------------------------

        function resetViews() {
            //Reset all views to false
            $scope.login = $scope.register = $scope.forgot = false;
        }

        function updateView(newValue) {
            switch (newValue) {
            case $scope.loginRedirect:
                resetViews();
                $scope.login = true;
                break;
            case $scope.registerRedirect:
                resetViews();
                $scope.register = true;
                break;
            case $scope.forgotRedirect:
                resetViews();
                $scope.forgot = true;
                break;
            }
        }
    }

    Controller.$inject = ['$scope', '$location'];
    return Controller;
});


