define(function (require) {
    'use strict';

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/forgot/ForgotModule');
    require('scripts/reset/ResetModule');

    var angular = require('angular');
    var module = angular.module('amAuthPanelModule', [
            'amLoginModule',
            'amForgotModule',
            'amRegisterModule',
            'amResetModule'
        ])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));

    return module;
});


