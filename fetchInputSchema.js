/**
 * Script to fetch the input schema for the Apify Instagram Scraper Actor
 * 
 * This script uses the Apify API client to fetch the input schema for the
 * apify/instagram-scraper Actor.
 * 
 * Usage:
 *   node fetchInputSchema.js
 * 
 * The script will output the input schema as JSON.
 */

const { ApifyClient } = require('apify-client');

async function fetchInputSchema() {
    try {
        // Initialize the ApifyClient
        // Note: No API token is required for public actors
        const client = new ApifyClient();

        // Get the Actor details
        const actor = await client.actor('apify/instagram-scraper').get();
        
        console.log('Actor Name:', actor.name);
        console.log('Actor Description:', actor.description);
        console.log('\n=== Input Schema ===\n');
        
        // The input schema is typically in the defaultRunOptions.build.inputSchema
        // or in the input schema field directly
        const inputSchema = actor.defaultRunOptions?.build?.input || 
                          actor.inputSchema || 
                          'Input schema not found in expected location';
        
        console.log(JSON.stringify(inputSchema, null, 2));
        
        return inputSchema;
    } catch (error) {
        console.error('Error fetching input schema:', error.message);
        
        // If API access fails, provide alternative approach
        console.log('\n=== Alternative Approach ===');
        console.log('If the API is not accessible, you can:');
        console.log('1. Visit: https://apify.com/apify/instagram-scraper');
        console.log('2. Navigate to the "Input" tab');
        console.log('3. The input schema is available in the documentation or via browser DevTools');
        console.log('\nOr use the Playwright-based scraper (see fetchInputSchemaPlaywright.js)');
        
        throw error;
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    fetchInputSchema()
        .then(() => {
            console.log('\n✓ Successfully fetched input schema');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n✗ Failed to fetch input schema');
            process.exit(1);
        });
}

module.exports = { fetchInputSchema };
