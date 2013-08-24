define(function (require) {
    'use strict';

    function Directive() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&'
            },
            template: require('text!scripts/login/LoginTemplate.html'),
            controller: require('scripts/login/LoginController')
        };
    }

    return Directive;
});


