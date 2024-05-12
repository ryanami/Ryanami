/*
 * @Author: kasuie
 * @Date: 2024-05-06 14:53:22
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-06 20:25:40
 * @Description:
 */
import { defineComponent } from 'vue'
import LogView from '@/components/log/LogTabs.vue'

export default defineComponent({
  setup() {
    return () => (
      <div class="w-full h-full">
        <LogView />
      </div>
    )
  }
})
