/*
 * @Author: kasuie
 * @Date: 2024-05-06 15:29:16
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-14 15:21:31
 * @Description:
 */
import { analyzeLog } from '@/lib/detect'
import { defineComponent, onMounted, ref } from 'vue'
import request from '@/lib/fetch'
import LogView from '@/components/log/LogView.vue'
import { clsx } from '@kasuie/utils'

export default defineComponent({
  setup() {
    const result = ref()
    const logs = ref()
    const total = ref()
    const active = ref(-1)
    const statistic = ref([
      { text: 'DDOS攻击', value: 0, logs: '' },
      { text: '端口扫描', value: 0, logs: '' },
      { text: 'Webshell攻击', value: 0, logs: '' },
      { text: '蚁剑payload', value: 0, logs: '' },
      { text: '冰蝎payload', value: 0, logs: '' },
      { text: 'SQL 注入攻击', value: 0, logs: '' }
    ])
    const temps: any = ref([
      { ips: [] },
      { ips: [] },
      { ips: [] },
      { ips: [] },
      { ips: [] },
      { ips: [] }
    ])

    const getData = () => {
      const res1 = request.get('/spi/nginx-log', {}, { text: true })
      const res2 = request.get('/spi/error-log', {}, { text: true })
      const res3 = request.get('/spi/8088-log', {}, { text: true })
      const res4 = request.get('/spi/8088-error-log', {}, { text: true })
      return Promise.all([res1, res2, res3, res4])
    }

    onMounted(async () => {
      const data = await getData()
      const { ipRequest, logs: log } = analyzeLog(data)
      ipRequest.map((v: any) => {
        if (!temps.value[v.type - 1].ips.includes(v.ip)) {
          temps.value[v.type - 1].ips.push(v.ip)
          ++statistic.value[v.type - 1].value
        }
      })
      result.value = ipRequest
      statistic.value.map((v: any, index: number) => {
        statistic.value[index].logs = onFilter(index)
      })
      logs.value = log
      total.value = log
    })

    const onFilter = (key: number) => {
      let newLogs: string = ' '
      if (statistic.value[key].value) {
        result.value?.map((v: any) => {
          if (v.type - 1 === key) {
            newLogs = newLogs + v.content + '\n'
          }
        })
      }
      return newLogs
    }

    const onClick = (i: number) => {
      active.value = i
    }

    const renderLogs = (key: number) => {
      if (key >= 0) {
        return (
          <LogView
            class={clsx('opacity-0 z-[-1] absolute top-0 right-0 left-0', {
              '!opacity-100 !z-10': active.value === key
            })}
            key={key}
            value={statistic.value[key].logs}
          />
        )
      } else {
        return (
          <LogView
            class={clsx('opacity-0 z-[-1]', {
              '!opacity-100 !z-10': active.value === key
            })}
            key={key}
            value={logs.value}
          />
        )
      }
    }

    return () => (
      <div class="w-full h-full">
        <div class="flex gap-24 mb-8">
          {statistic.value.map((v: any, i: number) => {
            return (
              <a-statistic
                v-slots={{
                  formatter: ({ value }: { value: number }) => {
                    return (
                      <span class="underline cursor-pointer" onClick={() => onClick(i)}>
                        {value}
                      </span>
                    )
                  }
                }}
                title={v.text}
                value={v.value}
              />
            )
          })}
        </div>
        <div class="relative w-full h-full">
          {renderLogs(-1)}
          {statistic.value.map((_v: any, index: number) => renderLogs(index))}
        </div>
      </div>
    )
  }
})
