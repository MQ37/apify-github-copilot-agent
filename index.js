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
  // Initialize Apify client
  const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
  });

  // Construct Instagram profile URL
  const profileUrl = `https://www.instagram.com/${handle}/`;

  console.log(`🔍 Scraping Instagram profile: ${profileUrl}\n`);

  // Call the Instagram scraper Actor
  const run = await client.actor('apify/instagram-scraper').call({
    directUrls: [profileUrl],
    resultsLimit: 1,
    resultsType: 'posts',
  });

  console.log(`✅ Actor run completed! Run ID: ${run.id}\n`);

  // Wait for the run to finish
  await client.run(run.id).waitForFinish();

  // Get the dataset items
  const dataset = client.dataset(run.defaultDatasetId);
  const { items } = await dataset.listItems();

  if (!items || items.length === 0) {
    throw new Error(`No posts found for @${handle}. The profile might be private or have no posts.`);
  }

  const latestPost = items[0];

  // Return formatted post data
  return {
    caption: latestPost.caption || 'No caption',
    likes: latestPost.likesCount?.toLocaleString() || '0',
    comments: latestPost.commentsCount?.toLocaleString() || '0',
    postUrl: latestPost.url || 'N/A',
    timestamp: latestPost.timestamp || 'N/A',
    type: latestPost.type || 'Unknown',
    videoViews: latestPost.videoViewCount?.toLocaleString() || null,
  };
}

/**
 * Display latest post details
 * @param {Object} latestPost - Latest post information
 */
function displayLatestPost(latestPost) {
  console.log('='.repeat(60));
  console.log('📸 LATEST POST DETAILS\n');
  console.log(`🎬 Type: ${latestPost.type}`);
  console.log(`📝 Caption: ${latestPost.caption}`);
  console.log(`❤️  Likes: ${latestPost.likes}`);
  console.log(`💬 Comments: ${latestPost.comments}`);
  if (latestPost.videoViews) {
    console.log(`👁️  Video Views: ${latestPost.videoViews}`);
  }
  console.log(`📅 Posted: ${latestPost.timestamp}`);
  console.log(`🔗 Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
