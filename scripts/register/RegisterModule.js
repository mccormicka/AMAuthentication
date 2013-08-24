define(function (require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('amRegisterModule', [])
        .directive('amRegister', require('scripts/register/RegisterDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'))
        .service('redirectUtil', require('scripts/util/RedirectUtil'));

    return module;
});


