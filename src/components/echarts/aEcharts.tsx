/*
 * @Author: kasuie
 * @Date: 2024-05-06 15:32:35
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-12 20:18:46
 * @Description:
 */
import { defineComponent, onMounted, ref } from 'vue'
import type { ECOption } from '@/lib/echarts'
import echarts from '@/lib/echarts'

export default defineComponent({
  setup() {
    const logRef: any = ref()

    const options: ECOption = {
      title: {
        text: 'Access logs over time [Logs Nginx]'
      },
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        name: '时间',
        nameLocation: 'middle',
        nameGap: 45,
        data: [
          '00:00:00',
          '02:00:00',
          '04:00:00',
          '06:00:00',
          '08:00:00',
          '10:00:00',
          '12:00:00',
          '14:00:00',
          '16:00:00',
          '18:00:00',
          '20:00:00',
          '22:00:00'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [12, 23, 24, 28, 13, 14, 26, 1, 20, 9, 16, 25],
          type: 'line',
          smooth: true,
          color: '#18b7db'
        }
      ]
    }

    onMounted(() => {
      echarts.init(logRef.value)?.setOption(options)
    })

    return () => <div class="w-full h-full" ref={logRef}></div>
  }
})
