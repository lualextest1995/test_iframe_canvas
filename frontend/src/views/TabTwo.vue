<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'

const iframeUrl = ref('')
const loading = ref(true)
const error = ref(null)

// 模擬 API 請求函數
const fetchIframeUrl = async () => {
  try {
    // 假設這是你的 API 端點
    const response = await fetch('http://127.0.0.1:9527/iframe/api')
    const data = await response.json()
    iframeUrl.value = data.apiUrl // API 回傳的 iframe 連結
  } catch (err) {
    error.value = '無法載入 iframe 連結'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 當元件掛載時，請求 API
onMounted(fetchIframeUrl)

onActivated(() => {
  console.log('TabTwo activated')
})

onDeactivated(() => {
  console.log('TabTwo deactivated')
})
</script>

<template>
  <div>
    <h2>Tab 2</h2>
    <p>這個頁籤會從 API 請求 iframe 連結</p>

    <div v-if="loading">載入中...</div>
    <div v-else-if="error">{{ error }}</div>
    <iframe v-else :src="iframeUrl" width="100%" height="400" frameborder="0"></iframe>
  </div>
</template>

<style scoped>
iframe {
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
