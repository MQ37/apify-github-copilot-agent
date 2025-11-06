# Apify Github copilot agent

Apify Github copilot agent integrates Apify's web scraping and automation capabilities easily into your existing projects.

## Instagram CLI Tool

This project includes an Instagram CLI tool that uses the Apify Instagram scraper to fetch and display the latest post from any Instagram profile.

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your Apify API token to the `.env` file:
```
APIFY_TOKEN=your_apify_token_here
```

Get your Apify API token from: https://console.apify.com/account#/integrations

### Usage

Run the CLI tool:
```bash
npm start
```

Enter an Instagram profile handle (e.g., `therock`) when prompted, and the tool will fetch and display the latest post from that profile.
