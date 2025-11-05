# Actor input Schema

## `directUrls` (type: `array`):

Add one or more Instagram URLs to scrape. The field is optional, but you need to either use this field or search query below.

## `resultsType` (type: `string`):

You can choose to get posts, comments or details from Instagram URLs. Comments can only be scraped from post URLs.

## `resultsLimit` (type: `integer`):

How many posts or comments (max 50 comments per post) you want to scrape from each Instagram URL. If you set this to 1, you will get a single post from each page.

## `onlyPostsNewerThan` (type: `string`):

Limit how far back to the history the scraper should go. The date should be in YYYY-MM-DD or full ISO absolute format or in relative format e.g. 1 days, 2 months, 3 years. All time values are taken in UTC timezone

## `isUserTaggedFeedURL` (type: `boolean`):

Get the tagged posts for each profile

## `isUserReelFeedURL` (type: `boolean`):

Get the reels posts for each profile

## `search` (type: `string`):

Provide a search query which will be used to search Instagram for profiles, hashtags or places.

## `searchType` (type: `string`):

What type of pages to search for (you can look for hashtags, profiles or places).

## `searchLimit` (type: `integer`):

How many search results (hashtags, users or places) should be returned.

## `enhanceUserSearchWithFacebookPage` (type: `boolean`):

For each user from the top 10, the scraper extracts their Facebook page that sometimes contains their business email. Please keep in mind that you are forbidden to collect personal data in certain jurisdictions. Please see <a href="https://blog.apify.com/is-web-scraping-legal/#think-twice-before-scraping-personal-data">this article</a> for more details.

## `addParentData` (type: `boolean`):

Only for feed items - add data source to results, i.e. for profile posts metadata is profile, for tag posts metadata is hashtag

## Actor input object example

```json
{
  "directUrls": [
    "https://www.instagram.com/humansofny/"
  ],
  "resultsType": "posts",
  "resultsLimit": 200,
  "searchType": "hashtag",
  "searchLimit": 1,
  "addParentData": false
}
```
