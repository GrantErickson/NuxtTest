<template>
  <v-row justify="center">
    <v-col cols="12" xs="8" sm="6" md="4" lg="3">
      <v-card>
        <v-card-title class="headline">
          <div class="text-center">Wordle!</div>
        </v-card-title>
        <v-card-text>
          <div class="my-2">
            <v-btn block elevation="2" color="primary" nuxt to="/wordle">
              Play Daily Game
              <v-spacer />
              <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
            </v-btn>
          </div>

          <div class="my-2">
            <v-btn color="info" block nutx to="/about">
              About
              <v-spacer />
              <v-icon>mdi-message-question-outline</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" nuxt to="/"> Home </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HomePage extends Vue {}
</script>
