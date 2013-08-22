define(function (require) {
    'use strict';

    var angular = require('angular');
    angular.module('amRegisterModule', [])
        .directive('amRegister', require('scripts/register/RegisterDirective'))
        .value('errorFormatter', require('scripts/util/ErrorFormatter'));
});


