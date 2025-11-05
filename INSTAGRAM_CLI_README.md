# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays Instagram profile details and latest post information using the Apify Instagram scraper.

## Features

- Interactive CLI prompts user for Instagram profile handle
- Uses Apify's Instagram scraper Actor to fetch real data
- Shows latest post details (likes, comments, caption, timestamp, post URL, etc.)
- Clean and formatted output with emoji indicators

## Installation

```bash
npm install
```

## Setup

1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Get your Apify API token from: https://console.apify.com/account#/integrations

3. Add your token to the `.env` file:
```
APIFY_TOKEN=your_apify_token_here
```

## Usage

Run the CLI with:

```bash
npm start
```

or

```bash
npm run dev
```

The application will prompt you to enter an Instagram profile handle (without the @ symbol). For example, try `therock` to see The Rock's latest post.

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.gitignore` - Git ignore rules
- `.env.example` - Example environment variables file
- `.env` - Your actual environment variables (not committed)

## How It Works

The application uses the Apify Instagram scraper Actor (`apify/instagram-scraper`) to fetch Instagram data. The scraper:

1. Takes an Instagram profile URL
2. Scrapes the latest post from that profile
3. Returns structured data including:
   - Caption
   - Post type (Photo, Video, Sidecar)
   - Likes count
   - Comments count
   - Post URL
   - Timestamp

## Dependencies

- `apify-client` - Official Apify API client for running Actors
- `dotenv` - Environment variable management
- `readline-sync` - For synchronous command line input

## License

ISC
