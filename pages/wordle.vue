<template>
  <v-row justify="center">
    <v-col cols="12" xs="12" sm="8" md="7" lg="5" xl="3">
      <v-slide-y-reverse-transition>
        <v-card v-show="expand">
          <v-card-title class="headline">
            <div class="text-center">Guesses</div>
            <div v-show="!words.isLoaded" class="text-center">Loading...</div>
          </v-card-title>

          <v-card-text>
            <v-row
              dense
              v-for="guess in guesses"
              :key="guess.word"
              class="my-4"
            >
              <v-spacer />
              <letter
                v-for="(letter, index) in guess.letters"
                :letter="letter"
                :index="index"
                :key="index"
              ></letter>
              <v-spacer />
            </v-row>
          </v-card-text>

          <!-- Guess Area -->
          <v-card-text>
            <v-row justify="center" dense>
              <v-spacer />
              <letter
                v-for="(letter, index) in word.letters"
                :letter="letter"
                :index="index"
                :key="index"
              ></letter>
              <v-spacer />
            </v-row>
          </v-card-text>

          <v-divider>inset</v-divider>

          <!-- Keyboard -->
          <v-card-text>
            <v-row
              dense
              justify="center"
              v-for="(keyRow, rowIndex) in keyboard.keyRows"
              :key="rowIndex"
            >
              <key
                v-for="(letter, index) in keyRow"
                :letter="letter"
                :key="index"
                v-on:click="keyClick"
              ></key>
            </v-row>
          </v-card-text>

          <!-- Submit -->
          <v-card-text class="text-center">
            <v-chip :class="feedbackStyle">{{ feedbackText }}</v-chip>
            <v-spacer class="my-1" />
            <v-btn x-large @click="submit"> Submit </v-btn>
            <div>{{ this.wordToGuess }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" nuxt to="/"> Home </v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-y-reverse-transition>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Word, Keyboard, KeyboardLanguage, Letter } from '@/scripts/wordle'
import { Words } from '@/scripts/words'

@Component
export default class WordlePage extends Vue {
  word: Word = new Word('?????')
  guesses: Word[] = []
  keyboard: Keyboard = new Keyboard(KeyboardLanguage.English)
  expand: boolean = false
  feedbackText: string = 'Keep Guessing'
  feedbackStyle: string = 'info'
  words: Words = Words
  wordToGuess: string = ''

  constructor() {
    super()
    this.guesses.push(new Word('PEACH', '01320'))
    this.guesses.push(new Word('DIRTY', '00321'))
    this.guesses.push(new Word('SOUND', '32010'))
  }

  mounted() {
    Words.load().then(() => {
      console.log(Words.wordsOfLength(5)?.length)
      this.wordToGuess =
        Words.wordsOfLength(5)[
          Math.floor(Math.random() * Words.wordsOfLength(5).length)
        ]
    })
    this.word.letters[0].selected = true
    setTimeout(() => {
      this.expand = true
    }, 500)
  }

  keyClick(key: Letter) {
    console.log(key)
    let index = 0
    for (let letter of this.word.letters) {
      if (letter.selected) {
        letter.char = key.char
        letter.selected = false
        break
      }
      index++
    }
    if (index < 4) {
      this.word.letters[index + 1].selected = true
      this.feedbackText = 'Keep Guessing'
    } else {
      this.feedbackText = 'Submit Your Guess'
    }
  }

  submit() {
    this.guesses.push(this.word)
    this.word = new Word('?????')
    this.word.letters[0].selected = true
  }
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
}
</style>
