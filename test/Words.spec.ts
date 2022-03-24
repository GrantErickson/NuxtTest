/**
 * @jest-environment node
 */
// This is needed to make Axios work

// To Debug, open Debug: JavaScript Debug Terminal
// Set breakpoint, then run command
// npm test --watch

// Convert to TypeScript
// package.json add: "@types/jest": "^27.4.1"
// tsconfig.json add to types array: "@types/jest"

import { Words } from '@/scripts/words'

describe('WordBasics', () => {
  test('has words', () => {
    expect(Words.isLoaded).toBe(false)
  })
})

describe('Words', () => {
  test('has words', () => {
    Words.filename =
      'https://witty-bay-08c87f01e.1.azurestaticapps.net/allwords.txt'
    return Words.load().then(() => {
      expect(Words.isLoaded).toBe(true)
      expect(Words.words.length > 1000).toBeTruthy()
      expect(Words.wordsOfLength(5).length < Words.words.length).toBeTruthy()
    })
  }, 15000),
    test('Match String', () => {
      expect(Words.validWordCount('grant') === 1).toBeTruthy()
      expect(Words.validWordCount('gran?')).toBe(2)
      expect(Words.validWordCount('??ant')).toBe(13)
      let antWords = Words.validWords('??ant')
      expect(antWords.includes('grant')).toBeTruthy()
      expect(antWords.includes('plant')).toBeTruthy()
      expect(antWords.includes('slant')).toBeTruthy()
      expect(antWords.includes('spant')).toBeFalsy()
    })
})
