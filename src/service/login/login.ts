import { sjRequest } from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return sjRequest.post({
    url: '/login',
    data: account
  })
}
