# Instagram CLI Tool

A simple Node.js CLI application that fetches and displays Instagram profile details and latest post information.

## Features

- Interactive CLI prompts user for Instagram profile handle
- Displays profile information (followers, following, bio, etc.)
- Shows latest post details (likes, comments, caption, etc.)
- Clean and formatted output with emoji indicators

## Installation

```bash
npm install
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

## Project Structure

- `index.js` - Main CLI application
- `package.json` - Project configuration and dependencies
- `.gitignore` - Git ignore rules

## Development

### TODO Items

The following features are marked as TODO and will be implemented by the agent:

1. **Fetch Instagram Profile Data** - Implement `fetchInstagramProfile()` function
   - Retrieve profile information like followers, following, bio, post count
   - Validate profile exists

2. **Fetch Latest Post** - Implement `fetchLatestPost()` function
   - Retrieve the latest post from the profile
   - Extract post details: caption, likes, comments, timestamp

## Dependencies

- `readline-sync` - For synchronous command line input

## License

ISC
