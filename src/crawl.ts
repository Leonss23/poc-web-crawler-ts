import { JSDOM } from "jsdom";

export function getURLsFromHTML(htmlBody: string, baseURL: URL): URL[] {
  const urls: URL[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    try {
      const href = linkElement.getAttribute("href");
      if (href === null) continue;

      const url = new URL(href, baseURL);
      urls.push(url);
    } catch (error) {
      console.log(`Failed to get href`);
    }
  }
  return urls;
}

export function normalizeURL(urlString: string) {
  const urlObj = new URL(urlString);
  let url = urlObj.hostname + urlObj.pathname;
  return url.slice(0, lastNonSlash(url));
}

function lastNonSlash(str: string) {
  for (let index = str.length - 1; index > 0; index--) {
    if (str[index] !== "/") {
      return index + 1;
    }
  }
}

export async function crawlSite(url: URL) {
  console.log(`Fetching ${url}...`);
  const html = await fetchHTML(url);

  if (html === undefined) return;

  console.log(`Crawling ${url}...`);
  return getURLsFromHTML(html, url);
}

async function fetchHTML(url: URL) {
  try {
    const req = await fetch(url);

    if (!req.ok) {
      throw Error("Error response received");
    }
    if (!req.headers.get("content-type")?.includes("text/html")) {
      throw Error("Content type is not HTML");
    }
    const html = await req.text();
    return html;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch HTML from: ${url}`);
      console.error(error);
    }
  }
}
