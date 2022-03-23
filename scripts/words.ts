import axios from 'axios'
import { ResolvePlugin } from 'webpack'

export abstract class Words {
  public static readonly filename = 'allwords.txt'
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
}
