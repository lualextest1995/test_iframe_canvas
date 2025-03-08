<script setup>
import { ref, computed, onMounted, onActivated, onDeactivated } from 'vue'

const iframeUrl = ref('')
const iframeOrigin = computed(() => (iframeUrl.value ? new URL(iframeUrl.value).origin : ''))
const loading = ref(true)
const error = ref(null)
const cachedCanvasData = ref(null)
const iframeRef = ref(null)
const isFirstLoad = ref(true)

// 模擬 API 請求函數
const fetchIframeUrl = async () => {
  try {
    // 假設這是你的 API 端點
    const response = await fetch('http://127.0.0.1:9527/iframe/api/atlas')
    const data = await response.json()
    iframeUrl.value = data.apiUrl // API 回傳的 iframe 連結
  } catch (err) {
    error.value = '無法載入 iframe 連結'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 監聽來自 iframe 的訊息
const handleMessage = (event) => {
  if (event.origin !== iframeOrigin.value) return
  if (event.data.type === 'canvas-data') {
    cachedCanvasData.value = event.data.imageData
    console.log('🖼️ Vue 端已收到 Canvas 更新資料', cachedCanvasData.value)
  }
}

// 將資料傳遞回 iframe
const sendDataToIframe = () => {
  if (!cachedCanvasData.value || !iframeRef.value || !iframeRef.value.contentWindow) return

  const data = {
    type: 'restore-canvas',
    imageData: cachedCanvasData.value,
  }

  iframeRef.value.contentWindow.postMessage(data, iframeOrigin.value)
}

// 當元件掛載時，請求 API
onMounted(async () => {
  console.log('Tab3 mounted')
  await fetchIframeUrl()
  isFirstLoad.value = false
  window.addEventListener('message', handleMessage)
})

onActivated(() => {
  console.log('Tab3 activated')
  if (isFirstLoad.value) return
  setTimeout(() => {
    sendDataToIframe()
  }, 1000)
})

onDeactivated(() => {
  console.log('Tab3 deactivated')
})
</script>

<template>
  <div>
    <h2>Tab 3</h2>
    <p>這個頁籤會從 API 請求 iframe 連結 (atlas)</p>

    <div v-if="loading">載入中...</div>
    <div v-else-if="error">{{ error }}</div>
    <iframe
      v-else
      ref="iframeRef"
      :src="iframeUrl"
      width="100%"
      height="400"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style scoped>
iframe {
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
