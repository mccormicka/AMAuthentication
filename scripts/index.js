define(function (require) {
    'use strict';

    require('scripts/login/LoginModule');
    require('scripts/register/RegisterModule');
    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    angular.module('am.authentication', [
        'amAuthPanelModule',
        'amLoginModule',
        'amRegisterModule'
    ]);
});

