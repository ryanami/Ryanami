/*
 * @Author: kasuie
 * @Date: 2024-05-03 16:37:42
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-09 10:22:43
 * @Description:
 */
class API {
  static async request(url: RequestInfo | URL, options: any = {}) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const response = await fetch(url, {
        headers: {
          Authorization: 'ApiKey SHE1Vkw0OEJfRFB3TjBCMFoyS246R3dJVTg4emNUaUtGTFFFNFZwRmpSZw==',
          'kbn-xsrf': 'true',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        ...options
      })

      const data: any = options?.text ? await response.text() : await response.json()

      if (response.ok) {
        resolve(data)
      } else {
        reject(`${data?.message || 'Request failed'}`)
      }
    })
  }

  static get(url: RequestInfo | URL, params: any = {}, options = {}) {
    params = new URLSearchParams(params).toString()
    url = params ? `${url}?${params}` : url
    return API.request(url, {
      method: 'GET',
      ...options
    })
  }

  static post(url: RequestInfo | URL, body: any, options = {}) {
    return API.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    })
  }

  static delete(url: RequestInfo | URL, body: any, options = {}) {
    return API.request(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    })
  }

  static postQs(url: RequestInfo | URL, body?: any, options = {}) {
    return API.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      ...options
    })
  }

  static form(url: RequestInfo | URL, body?: any, options = {}) {
    return API.request(url, {
      method: 'POST',
      body: body,
      ...options
    })
  }

  //请求拦截
  static async interceptRequest(url: any, options = {}) {
    return { url, options }
  }

  //响应拦截
  static async interceptResponse(response: any) {
    return response
  }
}

export default API
