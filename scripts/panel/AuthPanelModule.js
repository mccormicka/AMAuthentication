define(function (require) {
    'use strict';

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/forgot/ForgotModule');
    var angular = require('angular');
    var module = angular.module('amAuthPanelModule', [
            'amLoginModule',
            'amForgotModule',
            'amRegisterModule'
        ])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));

    return module;
});


