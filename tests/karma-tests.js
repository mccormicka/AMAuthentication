'use strict';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
    var result = (/\\*spec\.js/).test(file);
    if (result) {
        console.log('file is ', file);
    }
    return result;
});

require({
    baseUrl: '/base/',
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
    },

    deps: tests,

    callback: window.__karma__.start
});