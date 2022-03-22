<template>
  <v-row justify="center">
    <v-col cols="12" xs="10" sm="9" md="7" lg="5">
      <v-slide-y-reverse-transition>
        <v-card v-show="expand">
          <v-card-title class="headline">
            <div class="text-center">Guesses</div>
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
                :key="index"
              ></letter>
              <v-spacer />
            </v-row>
          </v-card-text>

          <v-divider>inset</v-divider>

          <v-card-text>
            <v-row>
              <letter
                v-for="(letter, index) in word.letters"
                :letter="letter"
                :key="index"
              ></letter>
            </v-row>
          </v-card-text>

          <v-divider>inset</v-divider>

          <v-card-text>
            <v-row
              dense
              v-for="(keyRow, rowIndex) in keyboard.keyRows"
              :key="rowIndex"
            >
              <letter
                v-for="(letter, index) in keyRow"
                :letter="letter"
                :key="index"
              ></letter>
            </v-row>
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
import { Word, Keyboard, KeyboardLanguage } from '@/scripts/wordle'

@Component
export default class WordlePage extends Vue {
  word: Word = new Word('.....')
  guesses: Word[] = []
  keyboard: Keyboard = new Keyboard(KeyboardLanguage.English)
  expand: boolean = false

  constructor() {
    super()
    this.guesses.push(new Word('PEACH', '01320'))
    this.guesses.push(new Word('DIRTY', '00321'))
    this.guesses.push(new Word('SOUND', '32010'))
  }

  mounted() {
    setTimeout(() => {
      this.expand = true
    }, 500)
  }
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
}
</style>
