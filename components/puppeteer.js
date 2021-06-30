/**
 * @description Puppeteer related functions
 * @file /components/puppeteer.js
 * @author Henco Smith 2021
 */

/**
 * Modules
 */
const puppeteer = require('puppeteer');

const { logger } = require('./helpers');
//  const { insertUsers } = require('./db');
 
 /**
  * Exports
  */
 module.exports = {
     crawl: async (url) => {
        logger('Launching puppeteer...');
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        logger(`navigating to ${url}/login...`);
        await page.goto(`${url}/login`);

        logger('entering username & password...');
        await page.type('input[name=username]', process.env.AFFLUENT_USERNAME);
        await page.type('input[name=password]', process.env.AFFLUENT_PASSWORD);

        logger('submitting form...')
        await page.keyboard.press('Enter');

        await page.waitForNavigation();
        
        const dataURL = `${url}/list?type=dates&startDate=2020-10-01&endDate=2020-10-30`
        logger(`navigating to ${dataURL}...`)
        await page.goto(dataURL);
        await page.waitForNavigation({ waitUntil: 'networkidle2' }),

        logger('pulling data...')
        const rows = await page.$$eval('table', (nodes) => {
            console.log('!!!!');
            console.log(nodes);
            return nodes.map(x => x.textContent);
        });
        console.log('returned!!!');
        console.log(rows);
        await page.screenshot({ path: 'example.png' });

        // await browser.close();
     },
 }