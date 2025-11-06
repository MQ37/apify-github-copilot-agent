import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ApifyClient } from 'apify-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Instagram CLI Tool
 * Fetches and displays the latest post from an Instagram profile
 */

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('profile', {
      alias: 'p',
      describe: 'Instagram profile handle (without @)',
      type: 'string',
      demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .example('$0 -p kapakoulak', 'Get latest post for @kapakoulak')
    .example('$0 --profile kapakoulak', 'Get latest post for @kapakoulak')
    .parseSync();

  const handle = argv.profile;

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
    throw new Error('APIFY_TOKEN environment variable is not set. Please set it in .env file.');
  }

  // Initialize Apify client
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  console.log('🔄 Running Instagram Profile Scraper...');

  // Run the Instagram Profile Scraper Actor
  const run = await client.actor('apify/instagram-profile-scraper').call({
    usernames: [handle],
  });

  console.log('⏳ Waiting for scraper to finish...');

  // Wait for the Actor to finish
  await client.run(run.id).waitForFinish();

  // Get the results from the dataset
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  if (!items || items.length === 0) {
    throw new Error(`No data found for Instagram profile: @${handle}`);
  }

  const profileData = items[0];

  // Get the latest post from the profile
  if (!profileData.latestPosts || profileData.latestPosts.length === 0) {
    throw new Error(`No posts found for profile: @${handle}`);
  }

  const latestPost = profileData.latestPosts[0];

  // Format and return the latest post data
  return {
    caption: latestPost.caption || 'No caption',
    likes: latestPost.likesCount !== undefined && latestPost.likesCount !== null 
      ? latestPost.likesCount.toLocaleString() 
      : 'N/A',
    comments: latestPost.commentsCount !== undefined && latestPost.commentsCount !== null 
      ? latestPost.commentsCount.toLocaleString() 
      : 'N/A',
    postUrl: latestPost.url || 'N/A',
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
  console.log(`Likes: ${latestPost.likes}`);
  console.log(`Comments: ${latestPost.comments}`);
  console.log(`Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(40) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
