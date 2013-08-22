define(function (require) {
    'use strict';
    require('am-authentication');
    var angular = require('angular');

    angular.module('demo', ['am.authentication'])
        .controller('demoCtrl', function ($scope) {
            $scope.errorFormatter = function () {
                return {title: 'demo', description: 'demo'};
            };
        });

    angular.bootstrap(document, ['demo']);

});


