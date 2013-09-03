'use strict';
var require = {
    baseUrl: '/',
    paths: {
        'am-authentication': 'scripts/index',
        angular: 'components/angular/angular',
        'angular-sanitize': 'components/angular-sanitize/angular-sanitize',
        'angular-mocks': 'components/angular-mocks/angular-mocks',
        text: 'components/text/text',
        jquery: 'components/jquery/jquery',
        lodash: 'components/lodash/dist/lodash'

    },
    shim:{
        angular: {
            exports: 'angular'
        },
        'angular-sanitize':{
            deps:['angular'],
            exports:'angular-sanitize'
        },
        'angular-mocks':{
            deps:['angular'],
            exports:'angular-mocks'
        },
        lodash:{
            exports:'lodash'
        }
    }
};