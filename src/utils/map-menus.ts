import type { RouteRecordRaw } from 'vue-router'

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

/**
 * 根据路径去匹配需要的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
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

/**
 * 面包屑
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
interface IBreadcrumbs {
  name: string
  path?: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历数据获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}
