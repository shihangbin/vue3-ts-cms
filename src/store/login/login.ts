import { defineStore } from 'pinia'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'

import type { IAccount } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import { userMainStore } from '../main/main'

type ILoginState = {
  token: string
  userMenus: any
  userInfo: any
}

export const useLoginStore = defineStore('login', {
  // 指定state类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
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

      // 请求所以数据
      const mainStore = userMainStore()
      mainStore.fetchEntireDataAction()

      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 5.页面跳转(main)
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载操作
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      // 用户进行刷新: 判断用户是否登录以及是否包含userMenus菜单
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 请求所以数据
        const mainStore = userMainStore()
        mainStore.fetchEntireDataAction()
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
