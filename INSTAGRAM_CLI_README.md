# Instagram CLI Tool

A Node.js CLI application that fetches and displays the latest post from any public Instagram profile using the Apify Instagram Post Scraper.

## Features

- Fetch the latest post from any public Instagram profile
- Display comprehensive post information:
  - Profile name and username
  - Post date and type (Image/Video/Carousel)
  - Caption text
  - Like and comment counts
  - Video view counts (for video posts)
  - Direct link to the post
- Clean and formatted output with emoji indicators
- Powered by Apify's Instagram Post Scraper Actor

## Prerequisites

- Node.js (v14 or higher)
- Apify account and API token (get it free at [console.apify.com](https://console.apify.com/account#/integrations))

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Add your Apify API token to the `.env` file:

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

The application will prompt you to enter an Instagram profile handle (without the @ symbol).

### Example

```
Enter Instagram profile handle (without @): therock
```

The app will then fetch and display the latest post from @therock with all relevant information.

## How It Works

The CLI uses the [Apify Instagram Post Scraper](https://apify.com/apify/instagram-post-scraper) to extract public Instagram data. The scraper:

1. Accesses the public Instagram profile
2. Retrieves the latest post information
3. Returns structured data including engagement metrics

**Note:** The scraping process typically takes 30-60 seconds as it needs to fetch real-time data from Instagram.

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.env` - Environment variables (not committed to git)
- `.env.example` - Template for environment variables
- `.gitignore` - Git ignore rules

## Dependencies

- `apify-client` - Official Apify API client for Node.js
- `dotenv` - Load environment variables from .env file
- `readline-sync` - For synchronous command line input

## Limitations

- Only works with **public** Instagram profiles
- Fetches only the **latest post** (most recent)
- Subject to Instagram's rate limits and availability

## License

ISC
