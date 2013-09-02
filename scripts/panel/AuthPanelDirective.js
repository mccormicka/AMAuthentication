define(function (require) {
    'use strict';

    function Directive() {
        return {
            replace: true,
            scope: {
                email: '=',
                password: '=',
                //Login
                loginRedirect: '@',
                loginSuccess: '@',
                loginEndpoint: '@',
                loginErrorFormatter: '&',
                //Register
                registerRedirect: '@',
                registerEndpoint: '@',
                registerSuccess: '@',
                registerErrorFormatter: '&',
                //Forgot
                forgotRedirect: '@',
                forgotEndpoint: '@',
                forgotSuccessFormatter: '&',
                forgotErrorFormatter: '&',
                //Reset
                resetRedirect: '@',
                resetEndpoint: '@',
                resetSuccess: '@',
                resetErrorFormatter: '&',

                searchParam: '@',
                translations: '='
            },
            template: require('text!scripts/panel/AuthPanelTemplate.html'),
            controller: require('scripts/panel/AuthPanelController'),
            link: function ($scope, iElement, $attrs) {
                //Setup a default value if none specified
                $attrs.$observe('searchParam', function (val) {
                    $scope.searchParam = val ? val : 'amauth';
                });
            }
        };
    }

    return Directive;
});