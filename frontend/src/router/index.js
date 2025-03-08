import { createRouter, createWebHistory } from 'vue-router'
import TabOne from '@/views/TabOne.vue'
import TabTwo from '@/views/TabTwo.vue'
import TabThree from '@/views/TabThree.vue'

const routes = [
  { path: '/', redirect: '/tab1' },
  { path: '/tab1', component: TabOne, meta: { title: 'Tab 1' } },
  { path: '/tab2', component: TabTwo, meta: { title: 'Tab 2' } },
  { path: '/tab3', component: TabThree, meta: { title: 'Tab 3' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
