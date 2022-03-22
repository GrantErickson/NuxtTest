<template>
  <v-col
    class="text-center text-h3 rounded-lg gradient mx-2"
    v-on:click="clickItem()"
    :class="{
      info: letter.unknown,
      error: letter.wrong,
      primary: letter.rightLetterWrongPlace,
      success: letter.rightLetterRightPlace,
    }"
  >
    {{ letter.char }}
  </v-col>
</template>

<script lang="ts">
// npm i -S vue-property-decorator
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Letter } from '@/scripts/wordle'

@Component
export default class LetterComponent extends Vue {
  @Prop() letter!: Letter
  @Prop() index!: number

  clickItem(): void {
    this.$emit('click', this.letter)
  }
}
</script>

<style></style>
