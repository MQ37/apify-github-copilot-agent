# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays Instagram profile details and latest post information using the Apify Instagram Profile Scraper.

## Features

- Fetches latest post from any public Instagram profile
- Displays post details (likes, comments, caption, URL)
- Clean and formatted output with emoji indicators
- Powered by Apify's Instagram Profile Scraper

## Prerequisites

- Node.js (v14 or higher)
- An Apify account and API token

## Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:

```bash
npm install
```

3. Set up your Apify API token:
   - Create a free account at [Apify](https://console.apify.com/sign-up)
   - Get your API token from [Apify Integrations](https://console.apify.com/account/integrations)
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your Apify token to `.env`:
     ```
     APIFY_TOKEN=your_actual_apify_token_here
     ```

## Usage

Run the CLI with an Instagram profile handle:

```bash
npm start -- -p <profile_handle>
```

or

```bash
npm start -- --profile <profile_handle>
```

### Examples

```bash
# Get latest post for @kapakoulak
npm start -- -p kapakoulak

# Get latest post for @natgeo
npm start -- --profile natgeo
```

The application will fetch and display the latest post information including:
- Caption
- Number of likes
- Number of comments
- Post URL

## Project Structure

- `index.js` - Main CLI application with Apify integration
- `package.json` - Project configuration and dependencies
- `.env.example` - Example environment variables file
- `.gitignore` - Git ignore rules

## Dependencies

- `yargs` - Command-line argument parsing
- `apify-client` - Apify API client for Instagram scraping
- `dotenv` - Environment variable management

## How It Works

This tool uses the [Apify Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper) to fetch public Instagram profile data. The scraper retrieves the latest posts from the profile, and the CLI displays the most recent one.

## License

ISC
