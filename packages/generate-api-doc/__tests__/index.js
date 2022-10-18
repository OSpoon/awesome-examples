import * as path from 'path';
import * as fs from 'fs-extra';
import { transformFileSync } from '@babel/core';

describe('', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    if (!fs.statSync(fixtureDir).isDirectory()) return;

    it(`should ${caseName.split('-').join(' ')}`, () => {
      const actualPath = path.join(fixtureDir, 'source-code.ts');

      // 执行转换后生成API文档
      transformFileSync(actualPath)

      const actual = fs.readFileSync(
        path.join(fixtureDir, 'actual.md')
      ).toString();
      const expected = fs.readFileSync(
        path.join(fixtureDir, 'api-docs.md')
      ).toString();
      expect(actual.trim()).toEqual(expected.trim());
    });
  });
});