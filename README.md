# Apify Github copilot agent

Apify Github copilot agent integrates Apify's web scraping and automation capabilities easily into your existing projects.

## Features

This repository provides tools to fetch the input schema for Apify Actors, specifically demonstrated with the Instagram Scraper Actor (`apify/instagram-scraper`).

### Three Approaches Available

1. **Direct HTTP Request** (`fetchActorInfo.js`) - **RECOMMENDED**: Fetches data from the `.md` endpoint which returns machine-readable JSON
2. **API Client Approach** (`fetchInputSchema.js`): Uses the Apify API client to fetch actor details
3. **Playwright Approach** (`fetchInputSchemaPlaywright.js`): Uses Playwright to fetch data from the `.md` endpoint

## Installation

```bash
npm install
```

For the Playwright approach, also install the browser:

```bash
npm run install-browsers
```

## Usage

### Method 1: Direct HTTP Request (Recommended - Fastest)

```bash
npm run fetch-schema
```

Or directly:

```bash
node fetchActorInfo.js [actorId]
```

Examples:
```bash
node fetchActorInfo.js apify/instagram-scraper
node fetchActorInfo.js apify/web-scraper
```

This method fetches Actor information from the `.md` endpoint (e.g., `https://apify.com/apify/instagram-scraper.md`) which returns the complete Actor data including the input schema in JSON format.

### Method 2: Using Apify API Client

```bash
npm run fetch-schema:api
```

Or directly:

```bash
node fetchInputSchema.js
```

This method uses the official Apify API client to fetch the input schema for the `apify/instagram-scraper` actor via the Apify API.

### Method 3: Using Playwright

```bash
npm run fetch-schema:playwright
```

Or directly:

```bash
node fetchInputSchemaPlaywright.js [actorId]
```

This method uses Playwright to navigate to the Actor's `.md` endpoint and extracts the input schema. Useful when you need browser-based access.

## Output

All scripts will output the input schema as JSON to the console. The schema describes all the input parameters that can be used when running the Instagram Scraper Actor.

Example output structure:
```json
{
  "title": "Input schema",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "username": {
      "title": "Username",
      "type": "string",
      "description": "Instagram username to scrape"
    },
    ...
  }
}
```

## Dependencies

- **apify-client**: Official Apify API client for programmatic access
- **playwright**: Browser automation library for web scraping approach

## How It Works

The `.md` endpoint is a special Apify feature that returns Actor metadata in a machine-readable JSON format when you append `.md` to any Actor URL:

- Regular URL: `https://apify.com/apify/instagram-scraper`
- Machine-readable: `https://apify.com/apify/instagram-scraper.md`

This makes it easy to programmatically fetch Actor information without needing to parse HTML or use authentication.

## Notes

- **Method 1** (Direct HTTP) is the fastest and most lightweight
- **Method 2** (API Client) provides more features and handles authentication for private actors
- **Method 3** (Playwright) is useful when you need full browser capabilities
- All methods can be adapted to fetch information for any Apify Actor

## License

ISC

