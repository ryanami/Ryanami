/*
 * @Author: kasuie
 * @Date: 2024-04-06 16:30:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-06 16:50:01
 * @Description:
 */
import { defineComponent } from "vue";

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <div>
        <div class="flex flex-nowrap items-center justify-between">
          <span class="flex-1 bg-black/20 dark:bg-white/20 w-16 h-[1px]"></span>
          <span class="text-center px-2 opacity-40">其他方式登录</span>
          <span class="flex-1 bg-black/20 dark:bg-white/20 w-16 h-[1px]"></span>
        </div>
        <ul class="flex justify-center gap-8 mt-4">
          <li class="cursor-pointer">
            <wechat-filled
              style={{
                fontSize: "24px",
              }}
            />
          </li>
          <li class="cursor-pointer">
            <qq-circle-filled
              style={{
                fontSize: "24px",
              }}
            />
          </li>
          <li>
            <weibo-circle-filled
              style={{
                fontSize: "24px",
              }}
            />
          </li>
        </ul>
      </div>
    );
  },
});
