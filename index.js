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
const { crawl } = require('./components/puppeteer');

/**
 * App
 */
(async () => {
    logger('Starting...');
    
    logger('Migrating latest DB...');
    await migrate();
    
    logger('Starting API...');
    const app = express();
    const port = 8080; // Could also be set in env and passed to docker compose

    // Would move this to a routes directory, if more routes are created
    app.get('/', async (req, res) => {
        const users = await getAllUsers();
        return res.json(users);
    })

    app.listen(port, async () => {
        // re pull on view; since MySQL db may be down or not up
        // could also instead add some state to ping until db is up then
        // pull once
        logger('Pulling data...');
        await pull('https://reqres.in/api/users');

        logger(`Listening at http://localhost:${port}`);
    });

    logger('Pulling data...');
    await pull('https://reqres.in/api/users');

    logger('Crawling for data...');
    await crawl('https://develop.pub.afflu.net');

    logger('Done.');
})();

// TODO: MySQL
// TODO: REST
// TODO: Puppeteer
