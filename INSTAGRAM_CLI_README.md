# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays the latest post information from Instagram profiles using the Apify platform.

## Features

- Fetch latest post from any public Instagram profile
- Displays comprehensive post details:
  - Post type (Image, Video, Carousel)
  - Caption
  - Like count
  - Comment count
  - Video view count (for videos)
  - Post timestamp
  - Direct link to the post
- Clean and formatted output with emoji indicators
- Powered by Apify's Instagram Scraper

## Prerequisites

1. **Node.js** (v14 or higher)
2. **Apify Account** - Sign up at [apify.com](https://apify.com)
3. **Apify API Token** - Get your token from [console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your Apify token:

```bash
cp .env.example .env
```

3. Edit `.env` and add your Apify API token:

```
APIFY_TOKEN=your_apify_token_here
```

## Usage

Run the CLI with the `-p` or `--profile` flag followed by an Instagram handle (without the @ symbol):

```bash
npm start -- -p therock
```

or

```bash
npm start -- --profile natgeo
```

### Example Output

```
📥 Fetching latest post for @therock...

========================================
📸 LATEST POST

Type: Video
Posted: 9/13/2025, 6:53:03 PM

Caption: Here's our newest trailer for THE SMASHING MACHINE...

❤️  Likes: 135,716
💬 Comments: 3,534
👁️  Video Views: 1,180,666

🔗 Post URL: https://www.instagram.com/p/DOjZnkGkbi5/

========================================
```

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.env` - Environment variables (API token)
- `.env.example` - Example environment configuration
- `.gitignore` - Git ignore rules

## How It Works

The CLI uses the [Apify Instagram Scraper](https://apify.com/apify/instagram-scraper) actor to fetch data from Instagram profiles. The scraper:

1. Takes an Instagram profile URL
2. Retrieves the latest post from that profile
3. Returns detailed post information including caption, likes, comments, and more
4. Handles both image and video posts

## Dependencies

- `yargs` - Command-line argument parsing
- `apify-client` - Official Apify SDK for Node.js
- `dotenv` - Environment variable management

## Troubleshooting

### Error: APIFY_TOKEN environment variable is not set

Make sure you've created a `.env` file with your Apify token. See the Installation section above.

### Error: No posts found

This can happen if:
- The profile doesn't exist
- The profile is private
- The profile has no posts
- The handle was misspelled

## License

ISC
