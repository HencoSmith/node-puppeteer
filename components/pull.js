/**
 * @description REST pull related functions
 * @file /components/pull.js
 * @author Henco Smith 2021
 */

/**
 * Modules
 */
const axios = require('axios');

const { logger } = require('./helpers');
const { insertUsers } = require('./db');

/**
 * Exports
 */
module.exports = {
    pull: async (url) => {
        let page = 1;
        let totalPages = 99;

        while (page <= totalPages) {
            const currentPage = await axios.get(`${url}?page=${page}`)
            if (currentPage.status !== 200) {
                logger(`pull failed - ${currentPage.status} '${currentPage.statusText}'`, 'red');
                return;
            }

            const { data } = currentPage;
            const users = data.data;
            // alternatively could pipe a bunch of users into memory
            // (using a queue like rabbitmq or redis) then bulk insert a large amount;
            // but since the dataset is small and no computation is required on the data
            // a simple await should be fine
            await insertUsers(users);

            page += 1;
            totalPages = data.total_pages;
        }
    },
}