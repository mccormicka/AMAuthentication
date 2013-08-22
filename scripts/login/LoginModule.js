define(function (require) {
    'use strict';

    var angular = require('angular');
    angular.module('amLoginModule', [])
        .directive('amLogin', require('scripts/login/LoginDirective'))
        .value('errorFormatter', require('scripts/util/ErrorFormatter'));
});


