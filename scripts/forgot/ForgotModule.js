define(function (require) {
    'use strict';

    var angular = require('angular');
    var module = angular.module('amForgotModule', [])
        .directive('amForgot', require('scripts/forgot/ForgotDirective'))
        .value('responseFormatter', require('scripts/util/ResponseFormatter'));

    return module;
});


