<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card>
        <v-card-title>{{ setup }}</v-card-title>
        <v-card-text v-if="showPunchline">{{ punchline }}</v-card-text>
        <v-card-actions v-if="showPunchline">
          <v-spacer/>
          <v-btn v-on:click="getJoke">Another Joke</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class JokePage extends Vue {
  busy: boolean = true
  setup: string = 'Loading...'
  punchline: string = ''
  showPunchline: boolean = false

  mounted() {
    this.getJoke()
  }

  getJoke(): void {
    this.showPunchline = false
    this.setup = ''
    this.punchline = ''
    this.$axios
      .$get('https://simplejokeapi.azurewebsites.net/joke')
      .then((value: Joke) => {
        console.log(value)
        this.setup = value.question
        this.punchline = value.answer
        this.busy = false

        setTimeout(() => {
          this.showPunchline = true
        }, 2000)
      })
  }
}

class Joke {
  question: string = ''
  answer: string = ''
  text: string = ''
  author: string = ''
  created: string = ''
  tags: string[] = []
  rating: number = -1
}
</script>
