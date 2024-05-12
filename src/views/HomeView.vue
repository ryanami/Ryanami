<!--
 * @Author: kasuie
 * @Date: 2024-05-02 16:53:58
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-09 11:04:51
 * @Description: 
-->
<script setup lang="ts">
import aEcharts from '@/components/echarts/aEcharts'
import { onMounted } from 'vue'
import request from '@/lib/fetch'

onMounted(async () => {
  const res: any = await request.get(
    '/api/kibana/dashboards/export?dashboard=nginx-046212a0-a2a1-11e7-928f-5dbe6f6f5519'
  )
  // const res: any = await request.post(
  //   '/api/saved_objects/_export',
  //   {
  //     type: '*'
  //   },
  //   { text: true }
  // )

  if (typeof res == "string") {
    console.log(JSON.parse(res));
  } else {
    console.log(res, 'res>>>')
  }

  if (res?.objects?.[0]?.attributes?.panelsJSON) {
    const string = res.objects[0].attributes.panelsJSON
    console.log(JSON.parse(string))
  }
})
</script>

<template>
  <aEcharts />
</template>
