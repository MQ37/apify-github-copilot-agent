# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays the latest post from an Instagram profile using the Apify Instagram scraper.

## Features

- Fetches the latest post from any public Instagram profile
- Displays post details including caption, likes, comments, video views (if applicable), and timestamp
- Clean and formatted output with emoji indicators
- Powered by Apify's Instagram scraper

## Prerequisites

- Node.js 14 or higher
- An Apify account with an API token (free tier available)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instagram-cli
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Apify API token:
   - Get your token from [Apify Console](https://console.apify.com/account#/integrations)
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your token:
     ```
     APIFY_TOKEN=your_actual_token_here
     ```

## Usage

Run the CLI with an Instagram profile handle (without the @ symbol):

```bash
npm start -- -p therock
```

or using the long form:

```bash
npm start -- --profile therock
```

### Example Output

```
📥 Fetching latest post for @therock...

🔍 Scraping Instagram profile: https://www.instagram.com/therock/

✅ Actor run completed! Run ID: abc123

============================================================
📸 LATEST POST DETAILS

🎬 Type: Video
📝 Caption: Here's our newest trailer for THE SMASHING MACHINE...
❤️  Likes: 135,712
💬 Comments: 3,534
👁️  Video Views: 1,180,654
📅 Posted: 2025-09-13T18:53:03.000Z
🔗 Post URL: https://www.instagram.com/p/DOjZnkGkbi5/

============================================================
```

## Command Line Options

- `-p, --profile <handle>` - Instagram profile handle (required)
- `-h, --help` - Show help information

## How It Works

1. The CLI uses the Apify Instagram scraper Actor
2. It fetches the latest post from the specified profile
3. Extracts relevant information (caption, likes, comments, etc.)
4. Displays the results in a formatted output

## Notes

- Only works with public Instagram profiles
- Profiles must have at least one post
- Rate limits may apply depending on your Apify plan
- The free Apify tier includes $5 of usage credits per month

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.env.example` - Environment variable template
- `.gitignore` - Git ignore rules

## Dependencies

- `yargs` - Command line argument parsing
- `apify-client` - Apify API client for Node.js
- `dotenv` - Environment variable management

## Troubleshooting

### "No posts found" error
- Verify the profile is public
- Check that the profile has at least one post
- Ensure the username is correct (without @)

### "Invalid token" error
- Make sure your APIFY_TOKEN is correctly set in the `.env` file
- Verify your token at [Apify Console](https://console.apify.com/account#/integrations)

## License

ISC
