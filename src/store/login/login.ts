import { defineStore } from 'pinia'
import router from '@/router'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

export const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录,获取 token
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.页面跳转(main)
      router.push('/main')
    }
  }
})
