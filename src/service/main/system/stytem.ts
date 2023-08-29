import { sjRequest } from '@/service'

export function newUserData(userInfo: any) {
  return sjRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function postUserListData(queryInfo: any) {
  return sjRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserListData(id: number) {
  return sjRequest.delete({
    url: `/users/${id}`
  })
}

export function editUserListData(id: number, userInfo: any) {
  return sjRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 真的页面网络请求的增删改查
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
