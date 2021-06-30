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
            database.migrate.latest();
        } catch (err) {
            logger(`DB not up - ${err.message}`, 'red');
        }
    },

    insertUsers: async (users) => {
        try {
            database.migrate.latest();
            await database('users').insert(users);
        } catch (err) {
            // Skip duplicates
            if (err.message.includes('Duplicate entry')) {
                return;
            };
            logger(`Insert failure - ${err.message}`, 'red');
            return;
        }
    },

    getAllUsers: async (users) => {
        try {
            const users = await database.from('users').select();
            return users;
        } catch (err) {
            logger(`Retrieve failure - ${err.message}`, 'red');
            return;
        }
    }
};
