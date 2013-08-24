define(function (require) {
    'use strict';

    require('scripts/panel/AuthPanelModule');

    var angular = require('angular');
    angular.module('am.authentication', [
        'amAuthPanelModule'
    ]);
});

