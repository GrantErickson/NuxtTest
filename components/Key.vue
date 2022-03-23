<template>
  <v-col
    cols="1"
    class="text-center text-h4 rounded-lg gradient my-1"
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
export default class KeyComponent extends Vue {
  @Prop() letter!: Letter

  clickItem(): void {
    this.$emit('click', this.letter)
  }
}
</script>

<style scoped>
</style>
