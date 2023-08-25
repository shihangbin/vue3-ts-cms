import { localCache } from '@/utils/cache'
import { sjRequest } from '..'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return sjRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return sjRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return sjRequest.get({
    url: `/role/${id}/menu`
  })
}
