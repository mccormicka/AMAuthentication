define(function (require) {
    'use strict';

    function Directive() {
        return {
            scope: {
                email: '=',
                successRedirect: '@',
                loginRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&',
                successFormatter:'&'
            },
            template: require('text!scripts/forgot/ForgotTemplate.html'),
            controller: require('scripts/forgot/ForgotController')
        };
    }

    return Directive;
});


