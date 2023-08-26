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
