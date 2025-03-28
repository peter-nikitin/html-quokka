import { describe, expect, test } from "vitest";
import { parseHtml } from "../parseHtml";

describe("format template string", () => {
  describe("output ", () => {
    test("simple output", () => {
      const input = "<a href='asas'>asdfasd</a>";

      const result = parseHtml(input);

      expect(result).toMatchInlineSnapshot(`
        "<a href='asas'>
          asdfasd
        </a>
        "
      `)
    });

    test("nested tags", () => {
      const input = `<div>    <a href='asas'>asdfasd</a></div>`;

      const result = parseHtml(input);

      expect(result).toMatchInlineSnapshot(`
        "<div>
          <a href='asas'>
            asdfasd
          </a>
        </div>
        "
      `);
    });
  });
});
