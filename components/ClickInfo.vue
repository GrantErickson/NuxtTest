<template>
  <v-list-item>
    Clicked '{{ item.text }}' at
    {{ item.time.toLocaleTimeString('en-US') }}
    <v-spacer></v-spacer>
    <v-btn v-on:click="deleteItem" elevation="5" color="warning" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
// npm i -S vue-property-decorator
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ClickInfo extends Vue {
  @Prop()
  item!: any

  deleteItem(): void {
    this.$emit('delete')
  }

}

</script>

<style></style>
