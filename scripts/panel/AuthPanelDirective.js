define(function (require) {
    'use strict';

    function Directive() {
        return {
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
                forgotSuccess: '@',
                forgotErrorFormatter: '&'
            },
            template: require('text!scripts/panel/AuthPanelTemplate.html'),
            controller: require('scripts/panel/AuthPanelController')
        };
    }

    return Directive;
});