define(function (require) {
    'use strict';

    var angular = require('angular');
    angular.module('am.authentication', [])
        .directive('amLogin', require('lib/login/login'));

    return true;
});


