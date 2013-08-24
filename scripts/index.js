define(function (require) {
    'use strict';

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/forgot/ForgotModule');
    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    angular.module('am.authentication', [
        'amAuthPanelModule',
        'amLoginModule',
        'amForgotModule',
        'amRegisterModule'
    ]);
});

