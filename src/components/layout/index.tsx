/*
 * @Author: kasuie
 * @Date: 2024-05-02 19:43:13
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-12 20:21:14
 * @Description:
 */
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeOutlined,
  FunctionOutlined,
  FundProjectionScreenOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { storage } from '@kasuie/utils'

export default defineComponent({
  setup(props, { slots }) {
    const router = useRouter()

    const selectedKeys = ref<string[]>(['/'])

    const collapsed = ref<boolean>(false)

    const visible = ref<boolean>(false)

    const username = ref()

    onMounted(() => {
      const login = storage.l.get('login')
      username.value = login
    })

    const handleMenuClick = (e: any) => {
      if (e.key === '1') {
        visible.value = false
        storage.l.remove('login')
        router.push('signin')
      }
    }

    return () => (
      <a-layout class="w-full h-full">
        <a-layout-sider v-model:collapsed={collapsed.value} trigger={null} collapsible>
          <div class="logo h-8 bg-white/40 m-4 " />
          <a-menu
            onClick={({ key }: { item: object; key: string; keyPath: any }) => {
              router.push(key)
            }}
            v-model:selectedKeys={selectedKeys.value}
            theme="dark"
            mode="inline"
          >
            <a-menu-item key="/">
              <HomeOutlined />
              <span>首页</span>
            </a-menu-item>
            <a-menu-item key="/log">
              <FundProjectionScreenOutlined />
              <span>日志</span>
            </a-menu-item>
            <a-menu-item key="/status">
              <FunctionOutlined />
              <span>检测</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-header class="flex !bg-white justify-between !p-0">
            {collapsed.value ? (
              <MenuUnfoldOutlined
                class="trigger px-6"
                onClick={() => (collapsed.value = !collapsed.value)}
              />
            ) : (
              <MenuFoldOutlined
                class="trigger px-6"
                onClick={() => (collapsed.value = !collapsed.value)}
              />
            )}
            <a-dropdown
              v-model:open={visible.value}
              v-slots={{
                overlay: () => {
                  return (
                    <a-menu onClick={handleMenuClick}>
                      <a-menu-item key="1">退出登录</a-menu-item>
                    </a-menu>
                  )
                }
              }}
            >
              <div class="px-4 pr-6 cursor-pointer flex items-center gap-2">
                <a-avatar
                  size={32}
                  v-slots={{
                    icon: () => <UserOutlined />
                  }}
                ></a-avatar>
                <span>{username.value}</span>
              </div>
            </a-dropdown>
          </a-layout-header>
          <a-layout-content
            class="overflow-y-auto mio-scroll"
            style={{
              margin: '16px',
              padding: '20px',
              background: '#fff',
              minHeight: '280px',
              maxHeight: 'calc( 100% - 64px)'
            }}
          >
            {slots.default?.()}
          </a-layout-content>
        </a-layout>
      </a-layout>
    )
  }
})
