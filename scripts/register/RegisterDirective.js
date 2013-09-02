define(function (require) {
    'use strict';

    function Directive() {
        return {
            replace:true,
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                loginRedirect: '@',
                endpoint: '@',
                errorFormatter:'&',
                text:'='
            },
            template: require('text!scripts/register/RegisterTemplate.html'),
            controller: require('scripts/register/RegisterController')
        };
    }

    return Directive;
});