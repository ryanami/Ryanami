<!--
 * @Author: kasuie
 * @Date: 2024-05-06 16:40:39
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-09 10:48:13
 * @Description: 
-->
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { ref, watch } from 'vue'
import request from '@/lib/fetch'

const props = defineProps<{
  url?: string
  value?: string
}>()

const LogRef: any = ref()

watch(
  () => props.url,
  (val) => {
    if (val) {
      request.get(`/spi/${val}`, {}, { text: true }).then((res: any) => {
        monaco.editor.create(LogRef.value, {
          value: res,
          language: 'shell',
          theme: 'vs-dark',
          readOnly: true
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
        value: val,
        language: 'shell',
        theme: 'vs-dark',
        readOnly: true
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
