<!--
 * @Author: kasuie
 * @Date: 2024-05-06 20:21:34
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-07 15:26:32
 * @Description: 
-->
<template>
  <a-tabs
    v-model:activeKey="activeKey"
    :tabBarGutter="2"
    forceRender
    type="card"
    class="mio-ant-tabs h-full w-full"
  >
    <a-tab-pane v-for="pane in panes" :key="pane.key" class="h-full" :tab="pane.title">
      <LogView :url="pane.content" />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LogView from './LogView.vue'
const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>([
  { title: 'nginx-log', content: 'nginx-log', key: '1' },
  { title: 'error-log', content: 'error-log', key: '2' },
  { title: '8088-log', content: '8088-log', key: '3' },
  { title: '8088-error-log', content: '8088-error-log', key: '4' }
])

const activeKey = ref(panes.value[0].key)
</script>
<style scoped>
.mio-ant-tabs :deep(.ant-tabs-content) {
  @apply h-full;
}
</style>
