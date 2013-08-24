'use strict';
var require = {
    baseUrl: '/',
    paths: {
        angular: 'components/angular/angular',
        'angular-mocks': 'components/angular-mocks/angular-mocks',
        text: 'components/text/text',
        jquery: 'components/jquery/jquery.min',
        'am-authentication': 'scripts/index'
    },
    shim:{
        angular: {
            exports: 'angular'
        },
        'angular-mocks':{
            deps:['angular'],
            exports:'angular-mocks'
        },
        jquery:{
            exports:['jquery']
        }
    }
};