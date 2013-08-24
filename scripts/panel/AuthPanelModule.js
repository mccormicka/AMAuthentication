define(function (require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('amAuthPanelModule', [])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));

    return module;
});


