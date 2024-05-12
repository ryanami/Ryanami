/*
 * @Author: kasuie
 * @Date: 2024-04-06 16:52:26
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-06 17:00:16
 * @Description:
 */
import { defineComponent } from "vue";

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <div class="flex-1 flex justify-center items-center">
        <div class="w-40 h-40 bg-black/20 dark:bg-white/20"></div>
      </div>
    );
  },
});
