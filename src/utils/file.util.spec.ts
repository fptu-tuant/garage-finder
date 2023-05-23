import { expect, test } from 'vitest';

import { getFileName, getFullFileName } from './file.util';

test('getFullFileName', () => {
  expect(getFullFileName('filename.tsx')).toBe('filename.tsx');
  expect(getFullFileName('path/to/filename.tsx')).toBe('filename.tsx');
});

test('getFileName', () => {
  expect(getFileName('filename.tsx')).toBe('filename');
  expect(getFileName('path/to/filename.tsx')).toBe('filename');
  expect(getFileName('filename')).toBe('filename');
});
