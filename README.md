# Small Web Crawler

> **Crawls a given website (HTML), retrieves links in `<a>` tags,
> then recursively crawls found links too, and finally outputs all found URLs**

Note: I limited it to finding 25 links, look for the `const limit` symbol to change it.

## Why

- Learned fundamentals of unit testing with a [Jest](https://jestjs.io/)-like testing library ([Vitest](https://vitest.dev/))
- Got a bit more familiar with the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) Class/API

## How to run

### With [`npm`](https://docs.npmjs.com/about-npm)

```bash
# Install dependencies
npm i

# Run tests
npm test

# To run the app pass a website's URL as an argument
# Run app
npm start SITE_URL

# Run app on watch mode
npm run dev SITE_URL

# e.g. `npm start https://leonardo-gatti.pages.dev`
```
