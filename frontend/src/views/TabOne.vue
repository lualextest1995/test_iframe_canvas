<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <h2>Tab 1</h2>
    <p>這是一個可保持狀態的 Tab</p>
    <button @click="count++">點擊增加：{{ count }}</button>
  </div>
</template>
