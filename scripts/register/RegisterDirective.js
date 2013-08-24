define(function (require) {
    'use strict';

    function Directive() {
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

    return Directive;
});