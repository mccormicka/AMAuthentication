define(function (require) {
    'use strict';

    function Login() {
        return {
            scope: {
                email: '=',
                password: '=',
                successRedirect: '@',
                forgotRedirect: '@',
                createRedirect: '@',
                endpoint: '@'
            },
            template: require('text!lib/login/template.html'),
            controller: require('lib/login/LoginController')
        };
    }

    return Login;
});


