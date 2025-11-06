import readlineSync from 'readline-sync';
import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Instagram CLI Tool
 * Fetches and displays the latest post from an Instagram profile
 */

async function main() {
  console.log('\n🎯 Instagram Latest Post CLI\n');
  console.log('='.repeat(40));

  // Get Instagram profile handle from user
  const handle = readlineSync.question(
    'Enter Instagram profile handle (without @): ',
    {
      trim: true,
      defaultValue: '',
    }
  );

  if (!handle) {
    console.log('❌ Profile handle cannot be empty');
    process.exit(1);
  }

  console.log(`\n📥 Fetching latest post for @${handle}...\n`);

  try {
    const latestPost = await fetchLatestPost(handle);

    // Display results
    displayLatestPost(latestPost);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Fetch latest post from Instagram profile
 * @param {string} handle - Instagram profile handle
 * @returns {Promise<Object>} Latest post data
 */
async function fetchLatestPost(handle) {
  // Check if APIFY_TOKEN is set
  if (!process.env.APIFY_TOKEN) {
    throw new Error('APIFY_TOKEN environment variable is not set. Please create a .env file with your Apify API token.');
  }

  // Initialize Apify client
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  console.log('🔄 Starting Instagram scraper...');

  // Run the Instagram scraper Actor
  const run = await client.actor('apify/instagram-scraper').call({
    directUrls: [`https://www.instagram.com/${handle}/`],
    resultsType: 'posts',
    resultsLimit: 1,
    searchType: 'user',
    searchLimit: 1,
  });

  console.log(`📊 Actor run ID: ${run.id}`);
  console.log('⏳ Waiting for scraper to finish...');

  // Wait for the Actor to finish
  await client.run(run.id).waitForFinish();

  console.log('✅ Scraping completed!');

  // Get the results from the dataset
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  if (!items || items.length === 0) {
    throw new Error(`No posts found for @${handle}. The profile might be private or doesn't exist.`);
  }

  // Extract the latest post data
  const latestPost = items[0];

  return {
    caption: latestPost.caption || 'No caption',
    likes: latestPost.likesCount || 0,
    comments: latestPost.commentsCount || 0,
    postUrl: latestPost.url || 'N/A',
    timestamp: latestPost.timestamp || 'N/A',
    type: latestPost.type || 'N/A',
  };
}

/**
 * Display latest post details
 * @param {Object} latestPost - Latest post information
 */
function displayLatestPost(latestPost) {
  console.log('='.repeat(40));
  console.log('📸 LATEST POST\n');
  console.log(`Caption: ${latestPost.caption}`);
  console.log(`Type: ${latestPost.type}`);
  console.log(`Likes: ${typeof latestPost.likes === 'number' ? latestPost.likes.toLocaleString() : latestPost.likes}`);
  console.log(`Comments: ${typeof latestPost.comments === 'number' ? latestPost.comments.toLocaleString() : latestPost.comments}`);
  console.log(`Timestamp: ${latestPost.timestamp}`);
  console.log(`Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(40) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
