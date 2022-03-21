<template>
  <v-col
    :key="letter.index"
    class="text-center text-h3 mx-2 rounded-lg gradient"
    :class="{
      info: letter.unknown,
      error: letter.wrong,
      primary: letter.rightLetterWrongPlace,
      success: letter.rightLetterRightPlace,
    }"
  >
    {{ letter.char }}
    <div class="fill-height bottom-gradient"></div>
  </v-col>
</template>

<script lang="ts">
// npm i -S vue-property-decorator
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Letter } from '@/scripts/wordle'

@Component
export default class LetterComponent extends Vue {
  @Prop() letter!: Letter

  deleteItem(): void {
    this.$emit('delete')
  }
}
</script>

<style></style>
