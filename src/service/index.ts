import { localCache } from '@/utils/cache'
import { BASE_URL, TIMEOUT } from './config'
import SJRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

export const sjRequest = new SJRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 类型缩小
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})
