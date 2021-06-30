/**
 * @description Example of MySQL, REST and Puppeteer - Main App Entry
 * @file /index.js
 * @author Henco Smith 2021
 */

/**
 * Modules.
 */
const express = require('express');

const { logger } = require('./components/helpers');
const { migrate, getAllUsers } = require('./components/db');
const { pull } = require('./components/pull');

/**
 * App
 */
(async () => {
    logger('Starting...');
    
    logger('Migrating latest DB...');
    await migrate();
    
    logger('Pulling data...');
    await pull('https://reqres.in/api/users');

    logger('Starting API...');
    const app = express();
    const port = 8080; // Could also be set in env and passed to docker compose

    // Would move this to a routes directory, if more routes are created
    app.get('/', async (req, res) => {
        const users = await getAllUsers();
        return res.json(users);
    })

    app.listen(port, () => {
        logger(`Listening at http://localhost:${port}`);
    });

    logger('Done.');
})();

// TODO: MySQL
// TODO: REST
// TODO: Puppeteer
