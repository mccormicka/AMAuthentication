define(function (require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('amResetModule', [])
        .directive('amReset', require('scripts/reset/ResetDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});
