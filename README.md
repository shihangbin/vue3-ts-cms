# vue3-ts-cms

技术栈介绍：

- 开发工具 :Visual Studio Code
- 编程语言 :TypeScript 4.x + JavaScript
- 构建工具 :Vite 3.x / Webpack5.x
- 前端框架 :Vue 3.x + setup
- 路由工具 :Vue Router 4.x
- 状态管理 :Vuex 4.x / Pinia
- UI 框架 :Element Plus
- 可视化 :Echart5.x
- 工具库 :@vueuse/core + dayjs + countup.js等等
- CSS 预编译 :Sass / Less
- HTTP 工具 : Axios
- Git Hook 工具 :husky
- 代码规范 :EditorConfig + Prettier + ESLint
- 提交规范 :Commitizen + Commitlint
- 自动部署 :Centos + Jenkins + Nginx

## 目录结构

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
