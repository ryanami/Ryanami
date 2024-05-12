<!--
 * @Author: kasuie
 * @Date: 2024-05-02 16:53:58
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-12 20:16:38
 * @Description: 
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import Layout from '@/components/layout'
const router = useRoute()
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#18b7db'
      }
    }"
  >
    <a-style-provider hash-priority="high">
      <Layout v-if="router.name != 'signin'"><RouterView /></Layout>
      <RouterView v-else />
    </a-style-provider>
  </a-config-provider>
</template>

<style scoped></style>
