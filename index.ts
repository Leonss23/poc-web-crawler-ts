import { crawlSite, normalizeURL } from "./src/crawl";

async function main() {
  if (process.argv.length < 3) {
    console.error("Please provide a website's URL as argument");
  }

  if (process.argv.length > 3) {
    console.error("Too many arguments");
  }

  const baseURL = new URL(process.argv[2]);
  const urls = new Set<URL>([baseURL]);
  const visitedURLs = new Set<string>();
  const limit = 25;

  for (const url of urls) {
    if (visitedURLs.size > limit) break;
    const visited = visitedURLs.has(url.toString());
    if (visited) continue;

    const newUrls = await crawlSite(url);

    visitedURLs.add(url.toString());

    if (newUrls === undefined) continue;

    for (const newUrl of newUrls) {
      urls.add(newUrl);
    }
  }
  const normalizedURLs = new Set<string>();
  for (const url of visitedURLs) {
    normalizedURLs.add(normalizeURL(url));
  }

  console.log({ normalizedURLs });
}

main();
