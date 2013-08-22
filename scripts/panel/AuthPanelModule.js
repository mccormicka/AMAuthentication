define(function (require) {
    'use strict';

    var angular = require('angular');
    angular.module('amAuthPanelModule', [])
        .directive('amAuthPanel', require('scripts/panel/AuthPanelDirective'));
});


