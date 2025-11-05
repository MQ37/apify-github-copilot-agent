/**
 * Script to fetch Actor information using the .md endpoint
 * 
 * This script fetches the Actor data by appending .md to the Actor URL,
 * which returns the Actor information in a machine-readable format.
 * 
 * Usage:
 *   node fetchActorInfo.js [actorId]
 * 
 * Example:
 *   node fetchActorInfo.js apify/instagram-scraper
 */

const https = require('https');
const http = require('http');

/**
 * Fetch Actor information from the .md endpoint
 * @param {string} actorId - The Actor ID (e.g., 'apify/instagram-scraper')
 * @returns {Promise<object>} - The Actor information including input schema
 */
async function fetchActorInfo(actorId) {
    const url = `https://apify.com/${actorId}.md`;
    
    console.log(`Fetching Actor information from: ${url}`);
    
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        
        protocol.get(url, (response) => {
            let data = '';
            
            // Check if response is successful
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to fetch data. Status code: ${response.statusCode}`));
                return;
            }
            
            // Accumulate data chunks
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            // Parse the complete response
            response.on('end', () => {
                try {
                    // The .md endpoint returns JSON data
                    const actorData = JSON.parse(data);
                    resolve(actorData);
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(new Error(`Request failed: ${error.message}`));
        });
    });
}

/**
 * Extract and display the input schema from Actor data
 * @param {object} actorData - The complete Actor data
 */
function displayInputSchema(actorData) {
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
    
    console.log('\n' + '='.repeat(60));
    console.log('INPUT SCHEMA');
    console.log('='.repeat(60) + '\n');
    
    // The input schema might be in different locations depending on the response format
    const inputSchema = actorData.inputSchema || 
                       actorData.input || 
                       actorData.defaultRunOptions?.build?.input ||
                       actorData.latestBuild?.inputSchema;
    
    if (inputSchema) {
        console.log(JSON.stringify(inputSchema, null, 2));
        return inputSchema;
    } else {
        console.log('Input schema not found in the expected location.');
        console.log('\nAvailable fields in Actor data:');
        console.log(Object.keys(actorData).join(', '));
        
        // Display the full data for debugging
        console.log('\n' + '='.repeat(60));
        console.log('FULL ACTOR DATA');
        console.log('='.repeat(60) + '\n');
        console.log(JSON.stringify(actorData, null, 2));
        
        return null;
    }
}

/**
 * Main function
 */
async function main() {
    // Get Actor ID from command line arguments or use default
    const actorId = process.argv[2] || 'apify/instagram-scraper';
    
    try {
        const actorData = await fetchActorInfo(actorId);
        const inputSchema = displayInputSchema(actorData);
        
        if (inputSchema) {
            console.log('\n✓ Successfully fetched input schema');
            process.exit(0);
        } else {
            console.log('\n⚠ Input schema not found in expected format');
            process.exit(1);
        }
    } catch (error) {
        console.error('\n✗ Error:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Check your internet connection');
        console.error('2. Verify the Actor ID is correct');
        console.error('3. The .md endpoint may not be accessible in your environment');
        console.error('\nAlternative: Use the Apify API client (see fetchInputSchema.js)');
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { fetchActorInfo, displayInputSchema };
