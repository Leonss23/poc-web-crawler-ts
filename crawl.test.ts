import { describe, expect, test } from "vitest";
import { normalizeURL } from "./crawl";

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
