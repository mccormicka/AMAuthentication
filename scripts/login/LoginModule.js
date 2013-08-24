define(function (require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('amLoginModule', [])
        .directive('amLogin', require('scripts/login/LoginDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});


