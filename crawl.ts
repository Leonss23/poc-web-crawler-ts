import { Window } from "happy-dom";

export function getURLsFromHTML(htmlBody: any, baseURL: any): string[] {
  const urls: string[] = [];
  const window = new Window();
  const document = window.document;
  document.write(htmlBody);
  const linkElements = document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    const href = linkElement.getAttribute("href");
    const url = new URL(href, baseURL);
    urls.push(url.toString());
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
