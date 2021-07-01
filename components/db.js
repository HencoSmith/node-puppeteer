/**
 * @description DB related functions
 * @file /components/helpers.js
 * @author Henco Smith 2021
 */

/**
 * Modules.
 */
const knex = require('knex');

const { logger } = require('./helpers');

/**
 * Statics.
 */
const database = knex({
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: './db/migrations/',
        tableName: 'knex_migrations',
    },
});

/**
 * Exports
 */
module.exports = {
    migrate: async () => {
        try {
            await database.migrate.latest();
        } catch (err) {
            logger(`DB not up - ${err.message}`, 'red');
        }
    },

    insertUsers: async (users) => {
        try {
            await database.migrate.latest();
            // This could be improved by making sure the entire page
            // is not skipped if one entry is a duplicate
            await database('users').insert(users);
        } catch (err) {
            // Skip duplicates
            if (err.message.includes('Duplicate entry')) {
                return;
            }
            logger(`Insert failure - ${err.message}`, 'red');
        }
    },

    getAllUsers: async () => {
        try {
            const users = await database.from('users').select();
            return users;
        } catch (err) {
            logger(`Retrieve failure - ${err.message}`, 'red');
            return [];
        }
    },

    insertFinance: async (data) => {
        try {
            await database.migrate.latest();
            // This could be improved by making sure the entire page
            // is not skipped if one entry is a duplicate
            await database('finance').insert(data);
        } catch (err) {
            // Skip duplicates
            if (err.message.includes('Duplicate entry')) {
                return;
            }
            logger(`Insert failure - ${err.message}`, 'red');
        }
    },

    getAllFinanceData: async () => {
        try {
            const finance = await database.from('finance').select();
            return finance;
        } catch (err) {
            logger(`Retrieve failure - ${err.message}`, 'red');
            return [];
        }
    },
};
