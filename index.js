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
  const apifyToken = process.env.APIFY_TOKEN;
  
  if (!apifyToken) {
    throw new Error('APIFY_TOKEN environment variable is required. Please set it in a .env file.');
  }

  // Initialize Apify client
  const client = new ApifyClient({
    token: apifyToken,
  });

  console.log('🚀 Running Instagram Post Scraper...\n');

  // Run the Instagram Post Scraper Actor
  const run = await client.actor('apify/instagram-post-scraper').call({
    username: [handle],
    resultsLimit: 1,
  });

  console.log('⏳ Waiting for results...\n');

  // Wait for the Actor to finish
  await client.run(run.id).waitForFinish();

  // Get the dataset with results
  const dataset = client.dataset(run.defaultDatasetId);
  const { items } = await dataset.listItems();

  if (!items || items.length === 0) {
    throw new Error(`No posts found for @${handle}. Make sure the profile is public and exists.`);
  }

  const latestPost = items[0];

  // Format the data for display
  return {
    caption: latestPost.caption || 'No caption',
    likes: latestPost.likesCount?.toLocaleString() || 'N/A',
    comments: latestPost.commentsCount?.toLocaleString() || 'N/A',
    postUrl: latestPost.url || 'N/A',
    type: latestPost.type || 'Unknown',
    timestamp: latestPost.timestamp ? new Date(latestPost.timestamp).toLocaleString() : 'N/A',
    videoViews: latestPost.videoViewCount ? latestPost.videoViewCount.toLocaleString() : null,
    ownerFullName: latestPost.ownerFullName || handle,
    ownerUsername: latestPost.ownerUsername || handle,
  };
}

/**
 * Display latest post details
 * @param {Object} latestPost - Latest post information
 */
function displayLatestPost(latestPost) {
  console.log('='.repeat(50));
  console.log('📸 LATEST POST\n');
  console.log(`👤 Profile: ${latestPost.ownerFullName} (@${latestPost.ownerUsername})`);
  console.log(`🕐 Posted: ${latestPost.timestamp}`);
  console.log(`📝 Type: ${latestPost.type}`);
  console.log(`\n💬 Caption:\n${latestPost.caption}\n`);
  console.log(`❤️  Likes: ${latestPost.likes}`);
  console.log(`💭 Comments: ${latestPost.comments}`);
  
  if (latestPost.videoViews) {
    console.log(`👀 Video Views: ${latestPost.videoViews}`);
  }
  
  console.log(`\n🔗 Post URL: ${latestPost.postUrl}`);
  console.log('\n' + '='.repeat(50) + '\n');
}

// Run the CLI
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
