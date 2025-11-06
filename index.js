import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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
 * 
 * TODO: Implement this function to fetch the latest post details
 */
async function fetchLatestPost(handle) {
  // Placeholder implementation
  return {
    caption: 'N/A',
    likes: 'N/A',
    comments: 'N/A',
    postUrl: 'N/A',
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
