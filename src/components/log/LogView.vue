<!--
 * @Author: kasuie
 * @Date: 2024-05-06 16:40:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-13 21:24:36
 * @Description: 
-->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { reactive, ref, watch } from 'vue'
import request from '@/lib/fetch'

const props = defineProps<{
  url?: string
  value?: string
}>()

const LogRef: any = ref()

const config = reactive({
  value: props.value,
  language: 'shell',
  theme: 'vs-dark',
  readOnly: true,
  links: true, // 是否点击链接
  minimap: {
    enabled: false
  }
})

watch(
  () => props.url,
  (val) => {
    if (val) {
      request.get(`/spi/${val}`, {}, { text: true }).then((res: any) => {
        monaco.editor.create(LogRef.value, {
          ...config,
          value: res
        })
      })
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.value,
  (val) => {
    if (val) {
      monaco.editor.create(LogRef.value, {
        ...config,
        value: val
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div ref="LogRef" class="h-full w-full"></div>
</template>
