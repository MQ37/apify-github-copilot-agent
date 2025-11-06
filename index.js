import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

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
    // Validate APIFY_TOKEN is set
    if (!process.env.APIFY_TOKEN) {
      console.error('❌ Error: APIFY_TOKEN environment variable is not set.');
      console.error('Please create a .env file with your Apify token.');
      console.error('See .env.example for reference.\n');
      process.exit(1);
    }

    // Fetch latest post data
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

  // Run Instagram scraper
  const run = await client.actor('apify/instagram-scraper').call({
    directUrls: [`https://www.instagram.com/${handle}/`],
    resultsLimit: 1,
    resultsType: 'posts',
  });

  // Wait for the actor to finish
  await client.run(run.id).waitForFinish();

  // Get dataset items
  const dataset = client.dataset(run.defaultDatasetId);
  const { items } = await dataset.listItems();

  if (items.length === 0) {
    throw new Error(`No posts found for @${handle}. The profile may not exist or may be private.`);
  }

  const post = items[0];

  return {
    caption: post.caption || 'No caption',
    likes: post.likesCount?.toLocaleString() || 'N/A',
    comments: post.commentsCount?.toLocaleString() || 'N/A',
    postUrl: post.url || 'N/A',
    timestamp: post.timestamp ? new Date(post.timestamp).toLocaleString() : 'N/A',
    type: post.type || 'N/A',
    videoViews: post.videoViewCount ? post.videoViewCount.toLocaleString() : null,
  };
}

/**
 * Display latest post details
 * @param {Object} latestPost - Latest post information
 */
function displayLatestPost(latestPost) {
  console.log('='.repeat(40));
  console.log('📸 LATEST POST\n');
  console.log(`Type: ${latestPost.type}`);
  console.log(`Posted: ${latestPost.timestamp}`);
  console.log(`\nCaption: ${latestPost.caption}`);
  console.log(`\n❤️  Likes: ${latestPost.likes}`);
  console.log(`💬 Comments: ${latestPost.comments}`);
  
  if (latestPost.videoViews) {
    console.log(`👁️  Video Views: ${latestPost.videoViews}`);
  }
  
  console.log(`\n🔗 Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(40) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
