import { describe, expect, test } from "vitest";
import { getURLsFromHTML, normalizeURL } from "./crawl";

describe("getURLsFromHTML", () => {
  test("absolute URLs", () => {
    const input = {
      htmlBody: `
  <html>
    <body>
      <a href="https://leonardo-gatti.pages.dev">
        Leonardo Gatti Website
      </a>
    </body>
  <html>
        `,
      baseURL: `https://leonardo-gatti.pages.dev`,
    };
    const actual = getURLsFromHTML(input.htmlBody, input.baseURL);
    const expected = ["https://leonardo-gatti.pages.dev/"];
    expect(actual).toEqual(expected);
  });

  test("relative URLs", () => {
    const input = {
      htmlBody: `
  <html>
    <body>
      <a href="/resume.pdf">
        Leonardo Gatti Website
      </a>
    </body>
  <html>
        `,
      baseURL: `https://leonardo-gatti.pages.dev`,
    };
    const actual = getURLsFromHTML(input.htmlBody, input.baseURL);
    const expected = ["https://leonardo-gatti.pages.dev/resume.pdf"];
    expect(actual).toEqual(expected);
  });

  test("multiple URLs", () => {
    const input = {
      htmlBody: `
<html>
  <body>
    <a href="#hero">
      absolute resume
    </a>
    <a href="/resume.pdf">
      absolute resume
    </a>
    <a href="resume.pdf">
      relative resume
    </a>
    <a href="https://leonardo-gatti.pages.dev">
      Leonardo Gatti Website
    </a>
    <a href="https://google.com">
      Google
    </a>

  </body>
<html>
      `,
      baseURL: `https://leonardo-gatti.pages.dev`,
    };
    const actual = getURLsFromHTML(input.htmlBody, input.baseURL);
    const expected = [
      "https://leonardo-gatti.pages.dev/#hero",
      "https://leonardo-gatti.pages.dev/resume.pdf",
      "https://leonardo-gatti.pages.dev/resume.pdf",
      "https://leonardo-gatti.pages.dev/",
      "https://google.com/",
    ];
    expect(actual).toEqual(expected);
  });
});

describe("normalizeURL", () => {
  test("strip protocol", () => {
    const input = "https://leonardo-gatti.pages.dev/resume.pdf";
    const actual = normalizeURL(input);
    const expected = "leonardo-gatti.pages.dev/resume.pdf";
    expect(actual).toEqual(expected);
  });

  test("strip trailing slash", () => {
    const input = "https://leonardo-gatti.pages.dev/resume.pdf/";
    const actual = normalizeURL(input);
    const expected = "leonardo-gatti.pages.dev/resume.pdf";
    expect(actual).toEqual(expected);
  });

  test("strip multiple trailing slash", () => {
    const input = "https://leonardo-gatti.pages.dev/resume.pdf///";
    const actual = normalizeURL(input);
    const expected = "leonardo-gatti.pages.dev/resume.pdf";
    expect(actual).toEqual(expected);
  });

  test("decapitalize hostname", () => {
    const input = "https://lEoNaRdO-gAtTi.PaGeS.dEv/ReSuMe.PdF";
    const actual = normalizeURL(input);
    const expected = "leonardo-gatti.pages.dev/ReSuMe.PdF";
    expect(actual).toEqual(expected);
  });
});
