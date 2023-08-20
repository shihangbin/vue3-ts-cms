import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { SJRequestConfig } from './type'

// 拦截器: 蒙版 loading | token | 修改配置等

class SJRequest {
  instance: AxiosInstance

  // requset 实例 => Axios 实例
  constructor(config: SJRequestConfig) {
    this.instance = axios.create(config)

    // 每个 instance 实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的 SJRequest 实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求
  request(config: SJRequestConfig) {
    return this.instance.request(config)
  }

  get(config: SJRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: SJRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config: SJRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config: SJRequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default SJRequest
