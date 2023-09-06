# vue3-ts-cms

技术栈介绍：

- 出自于 ：coderwhy 老师
- 开发工具 ：Visual Studio Code
- 编程语言 ：TypeScript 4.x + JavaScript
- 构建工具 ：Vite 3.x / Webpack5.x
- 前端框架 ：Vue 3.x + setup
- 路由工具 ：Vue Router 4.x
- 状态管理 ：Vuex 4.x / Pinia
- UI 框架 ：Element Plus
- 可视化 ：Echart5.x
- 工具库 ：@vueuse/core + dayjs + countup.js等等
- CSS 预编译 ：Sass / Less
- HTTP 工具 ： Axios
- Git Hook 工具 ：husky
- 代码规范 ：EditorConfig + Prettier + ESLint
- 提交规范 ：Commitizen + Commitlint
- 自动部署 ：Centos + Jenkins + Nginx

## 目录结构

![](https://img.xbin.cn/images/2023/08/29-02-31-246158.png)

1. `.vscode`：vscode插件推荐
2. `node_modules`：包
3. `public`：公共文件
4. `src`：源码
5. `.eslintrc.cjs`：
6. `.gitignore`：忽略文件
7. `.prettierrc.json`：格式化配置
8. `auto-imports.d.ts`：Element 按需引入自动生成
9. `components.d.ts`：Element 按需引入自动生成
10. `env.d.ts`：类型声明文件
11. `index.html`：模板文件
12. `package-lock.json`：包锁定版本
13. `package.json`：包需要文件和版本
14. `README.md`：文档
15. `tsconfig.app.json`：ts 指定待编译文件和定义编译选项
16. `tsconfig.json`：ts 文件配置引入(不推荐更改)
17. `tsconfig.node.json`：ssr 在 node 环境下运行的配置
18. `vite.config.ts`：给 vite 做配置

## src 结构

![](https://img.xbin.cn/images/2023/08/29-02-32-9d0cc3.png)

1. `assets`：静态文件
2. `components`：组件
3. `global`：全局工具
4. `hooks`：功能
5. `router`：路由
6. `service`：网络请求
7. `store`：状态管理
8. `utils`：工具
9. `views`：页面
10. `App.vue`：模板
11. `main.ts`：入口文件

## 配置

1. env.d.ts

```ts
// declare 声明 vue 文件
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
```

2. 安装插件

![](https://img.xbin.cn/images/2023/08/18-20-12-9f6ed0.png)

3. 安装 scss

```sh
npm install -D sass
```

## css 重置

```sh
npm i normalize.css
```

```ts
// main.ts
import 'normalize.css'
```

创建 reset.css 和 common.css

```ts
// index.css
@import './reset.css';
@import './common.css';

// reset.css
// https://github.com/willworks

// common.css
```

## router 配置

```sh
# 安装 router
npm i vue-router
```

```ts
// routet => index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 默认路径
    {
      path: '/',
      redirect: '/main'
    },
    // 错误路径
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFound/NotFound.vue')
    }
  ]
})

export default router
```

```ts
createApp(App).use(router).mount('#app')
```

## Pinia 配置

```sh
# 安装
npm install pinia
```

```ts
// store => index.ts
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

```ts
// src => main.ts
createApp(App).use(router).use(pinia).mount('#app')
```

### Pinia 案例:

1. counter.ts

```ts
import { defineStore } from 'pinia'

export const useCounterSotre = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounterAction(newCounter: number) {
      this.counter = newCounter
    }
  }
})
```

2. Main.vue

```vue
<script lang="ts" setup>
import { useCounterSotre } from '@/store/counter'

const counterStote = useCounterSotre()

const changeCounter = () => {
  counterStote.changeCounterAction(999)
}
</script>

<template>
  <div class="main">
    <h2>main:{{ counterStote.counter }}--{{ counterStote.doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<style lang="scss" scoped></style>
```

## Axios 封装

```sh
# 安装
npm i axios
```

- import.meta.env.MODE: {string} 应用运行的模式。
- import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
- import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
- import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

```ts
// config => index.ts
let BASE_URL = ''
// 生产环境 开发环境
if (import.meta.env.DEV) {
  BASE_URL = 'http://vue-shop-api-t.itheima.net/api/private/v1'
} else {
  BASE_URL = 'http://vue-shop-api-t.itheima.net/api/private/v1'
}

export const TIMEOUT = 10000
export { BASE_URL }
```

```ts
// request => index.ts
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
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        console.log('全局响应失败的拦截')
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
```

```ts
// Request => type.ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对 AxiosRequestConfig 进行扩展
export interface SJInterceptors {
  requestSuccessFn?: (config: AxiosRequestConfig) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}
export interface SJRequestConfig extends AxiosRequestConfig {
  interceptors?: SJInterceptors
}
```

```ts
// index.ts
import { BASE_URL, TIMEOUT } from './config'
import SJRequest from './request'

export const sjRequest = new SJRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('精细请求成功的拦截')
      return config
    },
    requestFailureFn: (err) => {
      console.log('精细请求失败的拦截')
      return err
    },
    responseSuccessFn: (res) => {
      console.log('精细响应成功的拦截')
      return res
    },
    responseFailureFn: (err) => {
      console.log('精细响应失败的拦截')
      return err
    }
  }
})
```

## Element-Plus 集成

```sh
# 安装
npm install element-plus --save
# 按需引入插件安装
npm install -D unplugin-vue-components unplugin-auto-import
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "auto-imports.d.ts",
    "components.d.ts"
  ],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## icon 图标

```sh
# 安装
npm install @element-plus/icons-vue
```

```ts
// global => register-icons.ts
// 如果您正在使用CDN引入，请删除下面一行。
import type { App } from 'vue'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
```

```ts
// main.ts
createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
```

```html
<el-icon><Iphone /></el-icon>
```

## postman

![](https://img.xbin.cn/images/2023/08/24-15-06-a2871b.png)

![](https://img.xbin.cn/images/2023/08/24-15-11-a82a9e.png)

![](https://img.xbin.cn/images/2023/08/24-15-09-3548f6.png)

![](https://img.xbin.cn/images/2023/08/24-15-13-e0f281.png)

![](https://img.xbin.cn/images/2023/08/24-15-13-cf5d16.png)

## login

### 路由守卫

![](https://img.xbin.cn/images/2023/08/24-17-11-2852dc.png)

```ts
// 导航守卫(to:哪里来,from:哪里去)
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  // 查看token是否存在:不存在就返回登录页面
  if (to.path === '/main' && !token) {
    return '/login'
  }
})
```

### cache 封装

```ts
enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
```

### 记住密码(布尔值的记录)

![](https://img.xbin.cn/images/2023/08/24-17-09-933bbe.png)

![](https://img.xbin.cn/images/2023/08/24-17-14-ca73e1.png)

```ts
const isRememberPwd = ref<boolean>(
  localCache.getCache('isRememberPwd') ?? false
)
watch(isRememberPwd, (newValue) => {
  localCache.removeCache('isRememberPwd')
  localCache.setCache('isRememberPwd', newValue)
})
```

### 账号登录

![](https://img.xbin.cn/images/2023/08/24-17-10-3cfec5.png)

```ts
// login.vue
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import { useLoginStore } from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须6~20位数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须要6位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isRememberPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户账号密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送请求
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRememberPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('验证失败')
    }
  })
}

defineExpose({
  loginAction
})
```

```html
<div class="panel-account">
  <el-form
    :model="account"
    label-width="60px"
    size="large"
    :rules="accountRules"
    ref="formRef"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="account.password" />
    </el-form-item>
  </el-form>
</div>
```

## main

### 侧边栏

![](https://img.xbin.cn/images/2023/08/26-01-03-bc9e9e.png)

```html
<div class="menu">
  <el-menu
    default-active="39"
    text-color="#b7bdc3"
    active-text-color="#fff"
    background-color="#001529"
  >
    <!-- 遍历菜单 -->
    <template v-for="item in userMenus" :key="item.id">
      <el-sub-menu :index="String(item.id)">
        <template #title>
          <!-- 字符串转成组件: "el-icon-setting" <el-icon><Monitor /></el-icon>-->
          <el-icon>
            <component :is="item.icon.split('el-icon-')[1]" />
          </el-icon>
          <template v-if="item.icon"></template>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="subitem in item.children" :key="subitem.id">
          <el-menu-item :index="String(subitem.id)"
            >{{ subitem.name }}</el-menu-item
          >
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</div>
```

### 动态路由

![](https://img.xbin.cn/images/2023/08/27-02-28-9bc4ce.png)

[动态创建页面路由工具](https://github.com/coderwhy/coderwhy)

```sh
# 安装
npm install coderwhy -g
# 查看
coderwhy --version
# 添加页面和路由
coderwhy add3page_setup test -d src/views/main/test
```

### 封装动态路由

```ts
// utils => map-menus.ts
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.获取菜单
  // const userMenusResult = await getUserMenusByRoleId(this.userInfo.role?.id)
  // this.userMenus = userMenusResult.data

  // 2.获取所以路由对象.放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 2.1 读取router/main所以ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 2.2 将所以的数据遍历得到数组,并放入数组
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 3.根据菜单动态匹配路由
  const routes: RouteRecordRaw[] = []
  // 第一层路由
  for (const menu of userMenus) {
    // 第二层路由
    for (const submenu of menu.children) {
      // 遍历localRoutes里面的数据对比后端里面的子路径 {path: '/main/analysis/dashboard', component: ƒ}
      const route = localRoutes.find((item) => item.path === submenu.url)
      // 放入到动态路由目录
      if (route) routes.push(route)
    }
  }
  return routes
}
```

```ts
// store => login/login.ts
// 动态添加路由
import { mapMenusToRoutes } from '@/utils/map-menus'

const routes = mapMenusToRoutes(this.userMenus)
routes.forEach((route) => router.addRoute('main', route))
```

### 封装动态不封装

```ts
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
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'

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

      // 重要: 动态添加路由
      // 1.获取菜单
      /*
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role?.id)
      this.userMenus = userMenusResult.data
      */

      // 2.获取所以路由对象.放到数组中
      const localRoutes: RouteRecordRaw[] = []
      // 2.1 读取router/main所以ts文件
      const files: Record<string, any> = import.meta.glob(
        '@/router/main/**/*.ts',
        { eager: true }
      )
      // 2.2 将所以的数据遍历得到数组,并放入数组
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
      }

      // 3.根据菜单动态匹配路由
      // 第一层路由
      for (const menu of this.userMenus) {
        // 第二层路由
        for (const submenu of menu.children) {
          // 遍历locaRoutes里面的数据对比后端里面的子路径 {path: '/main/analysis/dashboard', component: ƒ}
          const route = localRoutes.find((item) => item.path === submenu.url)
          if (route) router.addRoute('main', route)
        }
      }

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
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
```

### 动态路由另一种实现方式

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/Login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFound/NotFound.vue')
    }
  ]
})

const localRoutes = [
  {
    path: '/main/analysis/overview',
    component: () => import('@/views/Main/Analysis/Overview/Overview.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/Main/Analysis/Dashboard/Dashboard.vue')
  }
]
// 动态添加路由
router.addRoute('main', localRoutes[0])
router.addRoute('main', localRoutes[1])

// 导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
```

### 动态路由刷新

```ts
// store => login/login.ts
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
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
```

```ts
// store => index.ts
import { createPinia } from 'pinia'
import type { App } from 'vue'
import { useLoginStore } from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 使用pinia
  app.use(pinia)
  // 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
```

```ts
// main.ts
import store from './store'
createApp(App).use(store).use(router).use(registerIcons).mount('#app')
```

### 进入页面菜单匹配

![](https://img.xbin.cn/images/2023/08/27-04-11-cf511d.png)

```ts
// utils => map-menus.ts
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 3.根据菜单动态匹配路由
  const routes: RouteRecordRaw[] = []
  // 第一层路由
  for (const menu of userMenus) {
    // 第二层路由
    for (const submenu of menu.children) {
      // 遍历localRoutes里面的数据对比后端里面的子路径 {path: '/main/analysis/dashboard', component: ƒ}
      const route = localRoutes.find((item) => item.path === submenu.url)
      // 放入到动态路由目录
      if (route) routes.push(route)
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
      console.log(submenu)
    }
  }
  return routes
}
```

```ts
// router => index.ts
// 导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})
```

```ts
// utils => map-menus.ts
/**
 * 根据路径去匹配需要的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所以菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
```

```ts
// components => MainMenu.vue
const route = useRoute()
const pathMenu = mapPathToMenu(route.path, userMenus)
// 默认选择菜单
const defaultActive = ref(String(pathMenu.id))
```

## 面包屑

![](https://img.xbin.cn/images/2023/08/27-17-22-363d12.png)

```ts
// utils => map-menus.ts
/**
 * 面包屑
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历数据获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
```

```ts
// components => MainBreadcrumb.vue
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
```

```html
<!-- components => MainBreadcrumb.vue -->
<div class="MainBreadcrumb">
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="item.path"> {{ item.name }} </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</div>
```

```ts
// utils => map-menus.ts
// 从定向顶级菜单
function loadLocalRoutes() {
  // 1.获取菜单
  // const userMenusResult = await getUserMenusByRoleId(this.userInfo.role?.id)
  // this.userMenus = userMenusResult.data

  // 2.获取所有路由对象.放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 2.1 读取router/main所有ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 2.2 将所有的数据遍历得到数组,并放入数组
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()
  // 3.根据菜单动态匹配路由
  const routes: RouteRecordRaw[] = []
  // 第一层路由
  for (const menu of userMenus) {
    // 第二层路由
    for (const submenu of menu.children) {
      // 遍历localRoutes里面的数据对比后端里面的子路径 {path: '/main/analysis/dashboard', component: ƒ}
      const route = localRoutes.find((item) => item.path === submenu.url)
      // 放入到动态路由目录
      if (route) {
        // 1.给顶层菜单添加重定向
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.将二级菜单对应路径
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
```

## 系统管理

![](https://img.xbin.cn/images/2023/08/28-00-51-2299a9.png)

### 状态

![](https://img.xbin.cn/images/2023/08/28-00-52-ed2754.png)

```html
<el-table-column prop="enable" label="状态" width="100" align="center">
  <!-- 作用域插槽 -->
  <template #default="scope">
    <el-button
      size="small"
      :type="scope.row.enable ? 'success' : 'danger'"
      plain
    >
      {{ scope.row.enable ? '启用' : '禁用' }}
    </el-button>
  </template>
</el-table-column>
```

### 时间格式化

![](https://img.xbin.cn/images/2023/08/28-16-57-a56816.png)

```ts
// utils => formatTime.ts
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
```

```html
<el-table-column prop="createAt" label="创建时间" align="center">
  <template #default="scope"> {{ formatUTC(scope.row.createAt) }} </template>
</el-table-column>
```

## 分页器

![](https://img.xbin.cn/images/2023/08/28-17-38-5e4e58.png)

### 封装网络请求

```ts
// service => main => system => system.ts
import { sjRequest } from '@/service'

export function postUserListData(queryInfo: any) {
  return sjRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
```

```ts
import { defineStore } from 'pinia'
import { postUserListData } from '@/service/main/system/stytem'
import type { ISystem } from './type'

export const useSystemStore = defineStore('system', {
  // 为了完整类型推理，推荐使用箭头函数
  state: (): ISystem => {
    return {
      userList: [],
      userTotalCount: 0
    }
  },
  actions: {
    async postUserListAction(queryInfo: any) {
      // 调用网络请求
      const userListResult = await postUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    }
  }
})
```

```html
<!-- 页面 -->
<div class="Pagination">
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="userTotalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</div>
```

```ts
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'

// 获取store
const systemStore = useSystemStore()
// 页数
const pageSize = ref(10)
// 页码
const currentPage = ref(1)

// 调用网络请求
const fetchUserListData = () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  // 发送请求
  systemStore.postUserListAction(info)
}
fetchUserListData()

// 从store中解构列表和总列表数 响应式store数据
const { userList, userTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}
```

## 抽取重构

### 页面

![](https://img.xbin.cn/images/2023/08/30-19-58-ea923c.png)

```html
<!-- 新建页面 -->
<div class="model">
  <el-dialog
    v-model="dialogVisible"
    :title="
        isNewRef ? modelConfig.header.newTitle : modelConfig.header.editTitle
      "
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="item in modelConfig.formItems" :key="item.prop">
          <el-form-item v-bind="item">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button @click="newConfirmClick" type="primary"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</div>
```

```ts
// 新建逻辑
import { reactive } from 'vue'
import { ref } from 'vue'
import { useSystemStore } from '@/store/main/system/system'

interface IProps {
  modelConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()

const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  initialData[item.prop] = ''
}
const formData = reactive<any>(initialData)

const setModelVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
const systemStore = useSystemStore()

const newConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      formData
    )
  } else {
    // 新建
    systemStore.newPageListAction(props.modelConfig.pageName, formData)
    console.log(formData)
  }
}

defineExpose({ setModelVisible })
```

```ts
// 新建配置
const modelConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请输入上级部门',
      options: []
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导'
    }
  ]
}

export default modelConfig
```

### 父级页面

```html
<!-- 父级调用 -->
<div class="department">
  <page-search
    :search-config="searchConfig"
    @query-click="handleQueryClick"
    @reset-click="handleResetClick"
  >
  </page-search>
  <page-content
    ref="contentRef"
    :content-config="contentConfig"
    @new-click="handleNewClick"
    @edit-click="handleEditClick"
  >
  </page-content>
  <page-model :model-config="modelConfigRef" ref="modelRef"></page-model>
</div>
```

```ts
import { ref, computed } from 'vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import modelConfig from './config/model.config'
import { userMainStore } from '@/store/main/main'

const modelConfigRef = computed(() => {
  const mainStore = userMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...department)
    }
  })
  return modelConfig
})

const modelRef = ref<InstanceType<typeof PageModel>>()
const handleNewClick = () => {
  modelRef.value?.setModelVisible()
}
const handleEditClick = (itemData: any) => {
  modelRef.value?.setModelVisible(false, itemData)
}
```

![](https://img.xbin.cn/images/2023/08/30-20-16-c2ad00.png)

```ts
// 下拉框选择数据获取
const modelConfigRef = computed(() => {
  const mainStore = userMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...department)
    }
  })
  return modelConfig
})
```

```ts
// 功能
const newConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      formData
    )
  } else {
    // 新建
    systemStore.newPageListAction(props.modelConfig.pageName, formData)
    console.log(formData)
  }
}
```

### store 封装

```ts
// type.ts
export type IUser = {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystem {
  userList: IUser[]
  userTotalCount: number

  pageList: any[]
  pageTotalCount: number
}
```

```ts
// 状态管理
import { defineStore } from 'pinia'
import {
  postPageListData,
  deletePageById,
  editPageListData,
  newPageData
} from '@/service/main/system/stytem'
import type { ISystem } from './type'

export const useSystemStore = defineStore('system', {
  // 为了完整类型推理，推荐使用箭头函数
  state: (): ISystem => {
    return {
      pageList: [],
      pageTotalCount: 0
    }
  },
  actions: {
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageListByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const editResult = await editPageListData(pageName, id, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageListAction(pageName: string, userInfo: any) {
      const newListResult = await newPageData(pageName, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})
```

### 网络请求封装

```ts
// 网络请求
import { sjRequest } from '@/service'

export function postPageListData(pageName: string, queryInfo: any) {
  return sjRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return sjRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, userInfo: any) {
  return sjRequest.post({
    url: `/${pageName}`,
    data: userInfo
  })
}

export function editPageListData(pageName: string, id: number, userInfo: any) {
  return sjRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  })
}
```

### 表格页面

![](https://img.xbin.cn/images/2023/08/30-20-29-47999c.png)

```ts
// 配置
const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    {
      type: 'selection',
      label: '选择',
      width: '55px'
    },
    {
      type: 'normal',
      label: 'ID',
      prop: 'id',
      width: '70px'
    },
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      width: '150px'
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      width: '150px'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
      width: '150px'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'btnClick',
      label: '操作',
      width: '170px'
    }
  ]
}

export default contentConfig
```

```ts
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'
import { formatUTC } from '@/utils/formatTime'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const pageSize = ref(10)
const currentPage = ref(1)

// 获取表格
const fetchPageListData = (formatData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formatData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
fetchPageListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}
// 新建
const newBtnClick = () => {
  emit('newClick')
}
// 删除
const deleteBtnClick = (id: number) => {
  systemStore.deletePageListByIdAction(props.contentConfig.pageName, id)
}
// 修改
const editBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
```

![](https://img.xbin.cn/images/2023/08/30-20-31-aac20e.png)

```html
<div class="Pagination">
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageTotalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</div>
```

### hooks

```ts
// 抽取前
const modelRef = ref<InstanceType<typeof PageModel>>()
const handleNewClick = () => {
  modelRef.value?.setModelVisible()
}
const handleEditClick = (itemData: any) => {
  modelRef.value?.setModelVisible(false, itemData)
}
```

```ts
// hooks
import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'

function usePageModel() {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewClick = () => {
    modelRef.value?.setModelVisible()
  }
  const handleEditClick = (itemData: any) => {
    modelRef.value?.setModelVisible(false, itemData)
  }

  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}
export default usePageModel
```

```ts
// 抽取后
const { modelRef, handleEditClick, handleNewClick } = usePageModel()
```

### 角色权限回显

![](https://img.xbin.cn/images/2023/09/03-12-33-1d7523.png)

```ts
// role.vue
const { modelRef, handleEditClick, handleNewClick } = usePageModel(editCallback)
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
```

```ts
// utils => map-menus.ts
/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recuseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recuseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recuseGetId(menuList)

  return ids
}
```

```ts
// hooks
import { ref } from 'vue'
import type PageModel from '@/components/page-model/page-model.vue'

type EditFnType = (data: any) => void
function usePageModel(editCallback?: EditFnType) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewClick = () => {
    modelRef.value?.setModelVisible()
  }
  const handleEditClick = (itemData: any) => {
    modelRef.value?.setModelVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}
export default usePageModel
```
