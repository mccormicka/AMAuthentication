'use strict';
var require = {
    baseUrl: '/',
    paths: {
        angular: 'components/angular/angular',
        text: 'components/text/text',
        'am-authentication': 'lib/index'
    },
    shim:{
        angular: {
            exports: 'angular'
        }
    }
};