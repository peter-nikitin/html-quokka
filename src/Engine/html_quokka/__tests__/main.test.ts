import { describe, expect, test } from 'vitest';
import { parseHtml } from '../parseHtml';

describe('Format html with quokka', () => {
  describe('html only ', () => {
    test('simple tag', () => {
      const input = "<a href='asas'>asdfasd</a>";

      const result = parseHtml(input);

      expect(result).toMatchInlineSnapshot(`
        "<a href='asas'>
         asdfasd
        </a>
        "
      `);
    });

    test('nested tags', () => {
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

    describe('html with quokka', () => {
      test('tag with output inside', () => {
        const input = "<a href='asas'>${hh}</a>";

        const result = parseHtml(input);

        expect(result).toMatchInlineSnapshot(`
        "<a href='asas'>
         \${ hh }
        </a>
        "
      `);
      });

      test('tag with for block inside', () => {
        const input = "<a href='asas'>@{for a in b}${a}@{end for}</a>";

        const result = parseHtml(input);

        expect(result).toMatchInlineSnapshot(`
          "<a href='asas'>
             @{ for a in b }
              \${ a }

             @{ end for }</a>
          "
        `);
      });

      test('tag with if block inside', () => {
        const input = "<a href='asas'>@{if b}${a}@{end if}</a>";

        const result = parseHtml(input);

        expect(result).toMatchInlineSnapshot(`
          "
          <a href='asas'>
          @{ if b }
              \${ a }
          @{ end if }
          
          </a>"
        `);
      });
    });
  });
});
