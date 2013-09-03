define(function (require) {
    'use strict';

    require('angular-sanitize');
    var angular = require('angular');
    var module = angular.module('amLoginModule', ['ngSanitize'])
        .directive('amLogin', require('scripts/login/LoginDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});


