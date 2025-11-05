/**
 * Script to fetch the input schema for the Apify Instagram Scraper Actor using Playwright
 * 
 * This script uses Playwright to navigate to the Actor's .md endpoint which returns
 * machine-readable data including the input schema.
 * 
 * Usage:
 *   node fetchInputSchemaPlaywright.js [actorId]
 * 
 * Example:
 *   node fetchInputSchemaPlaywright.js apify/instagram-scraper
 * 
 * Prerequisites:
 *   npm install playwright
 *   npx playwright install chromium
 */

const { chromium } = require('playwright');

async function fetchInputSchemaWithPlaywright(actorId = 'apify/instagram-scraper') {
    let browser;
    
    try {
        console.log('Launching browser...');
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Use the .md endpoint which returns machine-readable data
        const url = `https://apify.com/${actorId}.md`;
        console.log(`Navigating to: ${url}`);
        
        await page.goto(url, {
            waitUntil: 'networkidle'
        });
        
        console.log('Page loaded successfully');
        
        // The .md endpoint returns JSON data in a pre tag or as plain text
        const bodyText = await page.locator('body').textContent();
        
        let actorData;
        try {
            // Try to parse the entire body as JSON
            actorData = JSON.parse(bodyText.trim());
        } catch (e) {
            // If that fails, try to find JSON in a pre or code tag
            const preElement = await page.locator('pre').first();
            if (preElement) {
                const preText = await preElement.textContent();
                actorData = JSON.parse(preText.trim());
            } else {
                throw new Error('Could not find JSON data on the page');
            }
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('ACTOR INFORMATION');
        console.log('='.repeat(60));
        
        if (actorData.name) {
            console.log(`Name: ${actorData.name}`);
        }
        
        if (actorData.title) {
            console.log(`Title: ${actorData.title}`);
        }
        
        if (actorData.description) {
            console.log(`Description: ${actorData.description}`);
        }
        
        // Extract the input schema
        const inputSchema = actorData.inputSchema || 
                          actorData.input || 
                          actorData.defaultRunOptions?.build?.input ||
                          actorData.latestBuild?.inputSchema;
        
        if (inputSchema) {
            console.log('\n' + '='.repeat(60));
            console.log('INPUT SCHEMA');
            console.log('='.repeat(60) + '\n');
            console.log(JSON.stringify(inputSchema, null, 2));
            return inputSchema;
        } else {
            console.log('\nInput schema not found in expected location.');
            console.log('Available fields:', Object.keys(actorData).join(', '));
            
            // Save full data for inspection
            console.log('\n' + '='.repeat(60));
            console.log('FULL ACTOR DATA');
            console.log('='.repeat(60) + '\n');
            console.log(JSON.stringify(actorData, null, 2));
            
            return null;
        }
        
    } catch (error) {
        console.error('Error fetching input schema with Playwright:', error.message);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    const actorId = process.argv[2] || 'apify/instagram-scraper';
    
    fetchInputSchemaWithPlaywright(actorId)
        .then((schema) => {
            if (schema) {
                console.log('\n✓ Successfully fetched input schema');
                process.exit(0);
            } else {
                console.log('\n⚠ Could not extract schema automatically');
                process.exit(1);
            }
        })
        .catch((error) => {
            console.error('\n✗ Failed to fetch input schema');
            console.error('Error:', error.message);
            process.exit(1);
        });
}

module.exports = { fetchInputSchemaWithPlaywright };
