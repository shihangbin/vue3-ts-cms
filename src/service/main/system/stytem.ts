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
