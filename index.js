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
    // TODO: Fetch latest post data
    // This part will be filled in by the agent
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
  // Check for API token
  if (!process.env.APIFY_TOKEN) {
    throw new Error('APIFY_TOKEN environment variable is required. Please set it in a .env file.');
  }

  // Initialize Apify client
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  console.log('🚀 Running Instagram Post Scraper...\n');

  // Run the Instagram Post Scraper Actor
  const run = await client.actor('apify/instagram-post-scraper').call({
    username: [handle],
    resultsLimit: 1, // Get only the latest post
  });

  console.log('⏳ Waiting for scraper to finish...\n');

  // Wait for the Actor to complete
  await client.run(run.id).waitForFinish();

  // Get the dataset with results
  const dataset = client.dataset(run.defaultDatasetId);
  const { items } = await dataset.listItems();

  if (!items || items.length === 0) {
    throw new Error(`No posts found for @${handle}. The profile might be private or doesn't exist.`);
  }

  // Return the first (latest) post
  const post = items[0];
  return {
    caption: post.caption || 'N/A',
    likes: post.likesCount !== undefined ? post.likesCount.toLocaleString() : 'N/A',
    comments: post.commentsCount !== undefined ? post.commentsCount.toLocaleString() : 'N/A',
    postUrl: post.url || 'N/A',
    timestamp: post.timestamp || 'N/A',
    type: post.type || 'N/A',
  };
}

/**
 * Display latest post details
 * @param {Object} latestPost - Latest post information
 */
function displayLatestPost(latestPost) {
  console.log('='.repeat(50));
  console.log('📸 LATEST POST\n');
  console.log(`Type: ${latestPost.type}`);
  console.log(`Posted: ${latestPost.timestamp}`);
  console.log(`\nCaption: ${latestPost.caption}`);
  console.log(`\n❤️  Likes: ${latestPost.likes}`);
  console.log(`💬 Comments: ${latestPost.comments}`);
  console.log(`\n🔗 Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(50) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
