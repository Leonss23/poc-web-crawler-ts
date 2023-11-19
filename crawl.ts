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
