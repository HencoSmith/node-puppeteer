/**
 * @description Puppeteer related functions
 * @file /components/puppeteer.js
 * @author Henco Smith 2021
 */

/**
 * Modules
 */
const _ = require('lodash');
const moment = require('moment');
const puppeteer = require('puppeteer');

const { logger } = require('./helpers');
const { insertFinance } = require('./db');

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

        logger('submitting form...');
        await page.keyboard.press('Enter');

        await page.waitForNavigation();

        const from = '2020-10-01';
        const to = '2020-10-30';
        const dataURL = `${url}/list?type=dates&startDate=${from}&endDate=${to}`;
        logger(`navigating to ${dataURL}...`);
        await page.goto(dataURL);

        // This could be improved with something like
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });
        // but atm an timeout error is thrown when using page.waitForNavigation
        // further investigation is required
        logger('Waiting for page...');
        await page.waitForTimeout(4000);

        logger('Pulling table...');
        // Could be improved to select even more details, maybe clicking on filters section etc.
        const data = await page.evaluate(() => {
            // eslint-disable-next-line no-undef
            const tableData = Array.from(document.querySelectorAll('table tr td'));
            return tableData.map((td) => td.innerText);
        });
        // Remove headers
        const filteredData = _.compact(data).slice(4);

        const totalDays = Math.abs(moment(to).diff(moment(from), 'days')) + 1;
        const expectedRows = totalDays * 3;

        logger('Formatting data...');
        const financeData = [];

        for (let i = 0; i < filteredData.length; i += 3) {
            if (i >= expectedRows) {
                break;
            }
            financeData.push({
                id: Math.round(i / 3),
                date: moment(filteredData[i]).format('YYYY-MM-DD'),
                commissions_total: parseFloat((filteredData[i + 1]).replace(/\$|,/g, '')),
                clicks: parseInt(filteredData[i + 2].replace(/,/g, ''), 10),
            });
        }

        logger('Storing data...');
        await insertFinance(financeData);

        logger('Taking screenshot...');
        await page.screenshot({ path: 'example.png' });

        logger('Closing browser...');
        await browser.close();
    },
};
