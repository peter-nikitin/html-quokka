import { describe, expect, test } from 'vitest';
import { runFormat } from '../format';

describe('format template string', () => {
  describe('output ', () => {
    test('simple output', () => {
      const input = '${ hihi }';

      const result = runFormat(input);

      expect(result).toBe('${ hihi }');
    });

    test('simple output', () => {
      const input = '${hihi} hihi';

      const result = runFormat(input);

      expect(result).toBe('${ hihi } hihi');
    });
  });

  describe('assigments', () => {
    test('assigments', () => {
      const input = '@{set hihi = 1}';

      const result = runFormat(input);

      expect(result).toBe('@{ set hihi = 1 }');
    });

    test('assigments', () => {
      const input = '@{set hihi = 1} asdfasdf';

      const result = runFormat(input);

      expect(result).toBe('@{ set hihi = 1 } asdfasdf');
    });
  });

  describe('if blocks', () => {
    test('format string', () => {
      const input = '@{if hihi } asd @{end if}';

      const result = runFormat(input);

      expect(result).toMatchInlineSnapshot(`
        "@{ if hihi }
         asd 
        @{ end if }"
      `);
    });
  });

  describe('for blocks', () => {
    test('format string', () => {
      const input = '@{for item in hihi } asd @{end for}';

      const result = runFormat(input);

      expect(result).toMatchInlineSnapshot(`
        "@{ for item in hihi }
         asd 
        @{ end for }"
      `);
    });
  });
});
