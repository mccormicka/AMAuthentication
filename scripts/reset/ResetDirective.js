define(function (require) {
    'use strict';

    function Directive() {
        return {
            replace:true,
            scope: {
                loginRedirect: '@',
                registerRedirect: '@',
                endpoint: '@',
                errorFormatter:'&',
                successFormatter:'&',
                successRedirect:'@'
            },
            template: require('text!scripts/reset/ResetTemplate.html'),
            controller: require('scripts/reset/ResetController')
        };
    }

    return Directive;
});
