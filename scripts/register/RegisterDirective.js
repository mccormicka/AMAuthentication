define(function (require) {
    'use strict';

    function RegisterDirective() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                loginRedirect: '@',
                endpoint: '@',
                errorFormatter:'&'
            },
            template: require('text!scripts/register/RegisterTemplate.html'),
            controller: require('scripts/register/RegisterController')
        };
    }

    return RegisterDirective;
});