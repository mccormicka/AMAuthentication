define(function () {
    'use strict';

    return{
        formatError: function (data) {
            if (data && data.key && data.description) {
                data.title = data.key;
            } else {
                data = {
                    title: 'invalid.request',
                    description: 'Server responded with an Error'
                };
            }
            return data;
        }
    };
});


