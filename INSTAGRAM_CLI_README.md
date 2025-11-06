# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays Instagram profile details and latest post information using Apify's Instagram Post Scraper.

## Features

- Fetch latest post from any public Instagram profile
- Display post details (likes, comments, caption, type, timestamp, etc.)
- Clean and formatted output with emoji indicators
- Built with Apify web scraping platform for reliable data extraction

## Installation

```bash
npm install
```

## Setup

1. Create a `.env` file in the project root (you can copy from `.env.example`):

```bash
cp .env.example .env
```

2. Get your Apify API token from [https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)

3. Add your token to the `.env` file:

```
APIFY_TOKEN=your_apify_token_here
```

## Usage

Run the CLI with the Instagram profile handle (without @):

```bash
npm start -- -p kapakoulak
```

or

```bash
node index.js --profile natgeo
```

### Examples

```bash
# Get latest post from kapakoulak
node index.js -p kapakoulak

# Get latest post from National Geographic
node index.js -p natgeo
```

### Help

To see all available options:

```bash
node index.js --help
```

## Output

The CLI displays:
- Post type (Image, Video, etc.)
- Post date/timestamp
- Caption text
- Number of likes (formatted with commas)
- Number of comments (formatted with commas)
- Direct URL to the post

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.env.example` - Example environment variables file
- `.gitignore` - Git ignore rules

## Dependencies

- `apify-client` - Official Apify API client for JavaScript
- `dotenv` - Environment variable management
- `yargs` - Command-line argument parser

## How It Works

The CLI uses Apify's Instagram Post Scraper Actor to fetch post data:

1. Takes an Instagram handle as input
2. Calls the Apify Instagram Post Scraper Actor
3. Waits for the scraper to complete
4. Retrieves the latest post from the dataset
5. Displays formatted post information

## License

ISC
