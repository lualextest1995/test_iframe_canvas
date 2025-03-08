<template>
  <div class="tabs-container">
    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        :class="{ active: route.path === tab.path }"
        @click="goToTab(tab.path)"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- 內容區域 (使用 keep-alive) -->
    <div class="tab-content">
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Vue Router
const router = useRouter()
const route = useRoute()

// 頁籤列表
const tabs = [
  { name: 'Tab 1', path: '/tab1' },
  { name: 'Tab 2', path: '/tab2' },
  { name: 'Tab 3', path: '/tab3' },
]

// 切換頁籤
const goToTab = (path) => {
  router.push(path)
}

// 透過 computed 取得當前 Component
const currentComponent = computed(() => {
  return route.matched[0]?.components.default
})
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

button {
  padding: 8px 16px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  border: 1px solid #ddd;
  padding: 16px;
  min-height: 200px;
}
</style>
