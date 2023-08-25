import { defineStore } from 'pinia'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'

type ILoginState = {
  token: string
  userMenus: any
  userInfo: any
}

export const useLoginStore = defineStore('login', {
  // 指定state类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENUS) ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录,获取 token
      const loginResult = await accountLoginRequest(account)
      const id: number = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取用户详细信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 3.根据角色请求用户的权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role?.id)
      this.userMenus = userMenusResult.data

      // 2.进行本地缓存
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(USER_MENUS, this.userMenus)

      // 5.页面跳转(main)
      router.push('/main')
    }
  }
})
