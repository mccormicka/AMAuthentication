define(function () {
    'use strict';

    function invalidData(data) {
        return !data || !data.title || !data.description;
    }

    return{

        /**
         * Formats a success response with a default message if
         * the data does not contain title/description attributes.
         * @param data
         * @returns {*}
         */
        formatSuccess: function(data){
            if (invalidData(data)) {
                data = {
                    title: 'Success!',
                    description: 'Successfully completed request'
                };
            }
            return data;
        },

        /**
         * Formats an error response with a default message if
         * the data does not contain title/description attributes.
          * @param data
         * @returns {*}
         */
        formatError: function (data) {
            if (invalidData(data)) {
                data = {
                    title: 'Error!',
                    description: 'Server responded with an Error'
                };
            }
            return data;
        }
    };
});


