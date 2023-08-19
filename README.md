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
8. `env.d.ts`：类型声明文件
9. `index.html`：模板文件
10. `package-lock.json`：包锁定版本
11. `package.json`：包需要文件和版本
12. `README.md`：文档
13. `tsconfig.app.json`：ts 指定待编译文件和定义编译选项
14. `tsconfig.json`：ts 文件配置引入(不推荐更改)
15. `tsconfig.node.json`：ssr 在 node 环境下运行的配置
16. `vite.config.ts`：给 vite 做配置

## src 结构

1. assets：静态文件
2. components：组件
3. hooks：功能
4. router：路由
5. store：状态管理
6. utils：工具
7. views：页面
8. App.vue：模板
9. main.ts：入口文件

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
  routes: []
})

export default router
```

```ts
createApp(App).use(router).mount('#app')
```
