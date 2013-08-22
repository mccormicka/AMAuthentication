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
        angular: 'components/angular/angular',
        'angular-mocks': 'components/angular-mocks/angular-mocks',
        text: 'components/text/text',
        'am-authentication': 'scripts/index'
    },
    shim:{
        angular: {
            exports: 'angular'
        },
        'angular-mocks':{
            deps:['angular'],
            exports:'angular-mocks'
        }
    },

    deps: tests,

    callback: window.__karma__.start
});