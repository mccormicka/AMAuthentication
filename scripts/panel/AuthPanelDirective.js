define(function (require) {
    'use strict';

    function LoginDirective() {
        return {
            scope: {
                email: '=',
                password: '=',
                loginRedirect: '@',
                loginSuccess: '@',
                loginEndpoint: '@',
                loginErrorFormatter: '&',
                registerRedirect: '@',
                registerEndpoint: '@',
                registerSuccess: '@',
                registerErrorFormatter: '&',
                forgotRedirect: '@'
            },
            template: require('text!scripts/panel/AuthPanelTemplate.html'),
            controller: require('scripts/panel/AuthPanelController')
        };
    }

    return LoginDirective;
});