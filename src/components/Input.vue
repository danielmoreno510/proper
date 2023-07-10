<script setup lang="ts">
defineProps<{
  value: string,
  placeHolder: string,
  changeValue: (value: string) => void
}>()
</script>

<script lang="ts">
export default {
  computed: {
    model: {
      get() { return this.value },
      set(newValue: string) { this.changeValue(newValue) }
    }
  }
}
</script>

<template>
  <input :type="value" v-model="model" :placeholder="placeHolder">
</template>