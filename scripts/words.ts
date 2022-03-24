import axios from 'axios'
import { ResolvePlugin } from 'webpack'

export abstract class Words {
  public static filename = 'allwords.txt'
  static _words: string[] | null = null
  static _isLoaded: boolean = false

  public static get words(): string[] {
    return this._words!
  }

  public static load(): Promise<string[]> {
    const promise = new Promise<string[]>((resolve, reject) => {
      if (!this.words) {
        let wordsResponse = axios
          .get(this.filename)
          .then((data) => {
            this._words = data.data.split('\n')
            this._isLoaded = true
            resolve(this.words)
          })
          .catch(() => reject())
      }
    })
    return promise
  }

  public static get isLoaded() {
    return this._isLoaded
  }

  public static wordsOfLength(length: number): string[] {
    return this.words.filter((f) => f.length === 5)
  }

  public static validWordCount(letters: string): number {
    return this.validWords(letters).length
  }

  public static validWords(letters: string): string[] {
    const lenth = letters.length
    const words = this.wordsOfLength(lenth)
    // Match all the words that have part of the word
    const regex = new RegExp(letters.toLowerCase().replaceAll('?', '.'), 'g')
    const matchingWords = words.filter((word) => word.match(regex))
    return matchingWords
  }
}
