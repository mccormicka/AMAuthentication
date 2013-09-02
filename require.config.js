'use strict';
var require = {
    baseUrl: '/',
    paths: {
        'am-authentication': 'scripts/index',
        angular: 'components/angular/angular',
        'angular-mocks': 'components/angular-mocks/angular-mocks',
        text: 'components/text/text',
        jquery: 'components/jquery/jquery.min',
        lodash: 'components/lodash/dist/lodash.min'

    },
    shim:{
        angular: {
            exports: 'angular'
        },
        'angular-mocks':{
            deps:['angular'],
            exports:'angular-mocks'
        }
    }
};