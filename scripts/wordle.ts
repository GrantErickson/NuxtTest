export class Word {
  letters: Letter[] = [
    new Letter(),
    new Letter(),
    new Letter(),
    new Letter(),
    new Letter(),
  ]

  constructor(letters?: string, correctness?: string) {
    if (letters) {
      let index: number = 0
      for (let letter of letters) {
        this.letters[index].char = letter
        if (correctness) {
          this.letters[index].correctness = parseInt(correctness[index])
        }
        index++
      }
    }
  }

  get word(): string {
    return this.letters.map((f) => f.char).join('')
  }
}

export class Letter {
  char: string = ''
  correctness: LetterCorrectness = LetterCorrectness.Unknown

  constructor(letter?: string) {
    if (letter) this.char = letter
  }

  get unknown(): boolean {
    return this.correctness == LetterCorrectness.Unknown
  }
  get wrong(): boolean {
    return this.correctness == LetterCorrectness.Wrong
  }
  get rightLetterWrongPlace(): boolean {
    return this.correctness == LetterCorrectness.RightLetterWrongPlace
  }
  get rightLetterRightPlace(): boolean {
    return this.correctness == LetterCorrectness.RightLetterRightPlace
  }
}

export class Keyboard {
  keyRows: Letter[][] = []

  constructor(language: KeyboardLanguage) {
    if (language === KeyboardLanguage.English) {
      this.LoadKeys('QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM')
    }
  }

  private LoadKeys(
    topRowChars: string,
    middleRowChars: string,
    bottomRowChars: string
  ) {
    let topRow: Letter[] = []
    for (let char of topRowChars) {
      topRow.push(new Letter(char))
    }
    this.keyRows.push(topRow)

    let middleRow: Letter[] = []
    for (let char of middleRowChars) {
      middleRow.push(new Letter(char))
    }
    this.keyRows.push(middleRow)

    let bottomRow: Letter[] = []
    for (let char of bottomRowChars) {
      bottomRow.push(new Letter(char))
    }
    this.keyRows.push(bottomRow)
  }

  private SetupEnglish() {}
}

export enum LetterCorrectness {
  Unknown = 0,
  Wrong = 1,
  RightLetterWrongPlace = 2,
  RightLetterRightPlace = 3,
}

export enum KeyboardLanguage {
  English = 1,
}
