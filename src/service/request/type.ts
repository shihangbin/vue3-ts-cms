import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对 AxiosRequestConfig 进行扩展
export interface SJInterceptors {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}
export interface SJRequestConfig extends AxiosRequestConfig {
  interceptors?: SJInterceptors
}
