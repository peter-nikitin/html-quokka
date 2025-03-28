import { describe, expect, test } from "vitest";
import { parseHtml } from "../parseHtml";

describe("format template string", () => {
  describe("output ", () => {
    test("simple output", () => {
      const input = "<a href='asas'>${ hh }</a>";

      const result = parseHtml(input);

      expect(result).toBe("<a href='asas'>${ hh }</a>");
    });
  });
});
