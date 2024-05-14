/*
 * @Author: kasuie
 * @Date: 2024-04-02 14:05:51
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-14 15:25:13
 * @Description:
 */
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { storage } from '@kasuie/utils'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(_props, { slots }) {
    interface FormState {
      code: string
      phone: any
      verifyCode: any
      username: string
      password: string
    }
    const formState = reactive<FormState>({
      code: '',
      phone: '',
      verifyCode: '',
      username: '',
      password: ''
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
      loading.value = true
      setTimeout(() => {
        const { username, password } = values
        if (username == 'admin' && password == '@admin') {
          message.success('登录成功')
          storage.l.set('login', username)
          router.push('/')
        } else {
          message.error('账号密码不正确')
        }
        loading.value = false
      }, 500)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }

    onMounted(() => {
      const login = storage.l.get('login')
      if (login) router.push('/')
    })

    const router = useRouter()

    const activeKey = ref('1')

    const loading = ref(false)

    return () => (
      <div class="h-full w-full flex items-center justify-center bg-[#f5f5f5]">
        <div class="flex flex-nowrap p-4 w-1/4 h-80 bg-white rounded">
          {/* <signin-scan /> */}
          <div class="flex-1">
            <a-tabs tabBarStyle={{
              marginBottom: "36px"
            }} v-model={activeKey} class="min-w-80">
              <a-tab-pane key="1" tab="密码登录">
                <a-form
                  model={formState}
                  name="pwd_login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <a-form-item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                    <a-input v-model:value={formState.username} placeholder="账号" />
                  </a-form-item>
                  <a-form-item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <a-input-password v-model:value={formState.password} placeholder="密码" />
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      loading={loading.value}
                      class="w-full"
                      type="primary"
                      htmlType="submit"
                    >
                      登录
                    </a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="2" tab="验证码登录" force-render>
                <a-form
                  model={formState}
                  name="normal_login"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <a-form-item name="phone" rules={[{ required: true, message: '请输入电话号码' }]}>
                    <a-input-group compact>
                      {/* <a-select v-model={formState.code} style="width: 32%">
                      <a-select-option value="中国 +86">中国 +86</a-select-option>
                      <a-select-option value="中国 +86">中国 +86</a-select-option>
                    </a-select> */}
                      <a-input
                        v-model:value={formState.phone}
                        placeholder="手机号"
                        // style="width: 68%"
                      />
                    </a-input-group>
                  </a-form-item>
                  <a-form-item
                    name="verifyCode"
                    rules={[{ required: true, message: '请输入验证码' }]}
                  >
                    <a-input-group compact>
                      <a-input
                        v-model:value={formState.verifyCode}
                        placeholder="验证码"
                        style="width: calc(100% - 104px)"
                      />
                      <a-button type="primary" ghost>
                        获取验证码
                      </a-button>
                    </a-input-group>
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      loading={loading.value}
                      class="w-full"
                      type="primary"
                      htmlType="submit"
                    >
                      登录/注册
                    </a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    )
  }
})
