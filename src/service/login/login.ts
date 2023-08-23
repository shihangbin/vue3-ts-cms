import { sjRequest } from '..'

export function accountLoginRequest(account: any) {
  return sjRequest.post({
    url: '/login',
    data: account
  })
}
