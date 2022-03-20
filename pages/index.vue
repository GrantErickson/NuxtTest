<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
        <NuxtLink to="/joke"><v-btn>A Joke</v-btn></NuxtLink>
      </v-card>
      <v-card>
        <v-card-title class="headline"> Welcome to Click Demo </v-card-title>
        <v-card-text>
          <v-btn
            elevation="2"
            v-on:click="showStuff"
            :disabled="buttonIsDisabled"
          >
            Do Fun Stuff: {{ message }}
            <v-chip small v-if="clickCount > 0" color="blue" class="ma-2">
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              #{{ clickCount }}</v-chip
            >
          </v-btn>

          <br />

          <v-card>
            <v-list id="list-of-clicks">
              <v-subheader><h2>Clicks</h2></v-subheader>
              <v-list-item-group>
                <click-info
                  v-for="item in clickInfos"
                  v-bind:key="item.key"
                  v-bind:item="item"
                  v-on:delete="deleteItem(item)"
                >
                </click-info>

                <v-list-item v-if="clickInfos.length === 0"
                  >Nothing Clicked Yet
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>

          <br />

          <v-btn v-on:click="reset">Reset</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" nuxt to="/inspire"> Continue </v-btn>
          <v-spacer />
          <v-btn color="primary" nuxt to="/home"> Wordle </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class IndexPage extends Vue {
  message: string = 'Click Me'
  clickInfos: EventInfo[] = []
  clickCount: number = 0
  buttonIsDisabled: boolean = false

  showStuff($event: MouseEvent): void {
    this.clickCount++
    //alert('Clicked!')
    if (!this.message.includes('again')) {
      this.message += ' again'
    }
    this.clickInfos.push(
      new EventInfo(($event.target as HTMLElement).innerText)
    )
    // Make sure all the keys are unique.
    this.buttonIsDisabled = true
    setTimeout(() => (this.buttonIsDisabled = false), 1000)
  }

  reset(): void {
    this.message = 'Click Me'
    this.clickCount = 0
    this.clickInfos.length = 0
  }

  deleteItem(event: EventInfo) {
    this.clickInfos.splice(this.clickInfos.indexOf(event), 1)
  }
}

class EventInfo {
  constructor(text: string) {
    this.text = text
  }

  text: string
  time: Date = new Date()
  get key(): string {
    return this.time.toString()
  }
}
</script>
