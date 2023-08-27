import { sjRequest } from '@/service'

export function postUserListData() {
  return sjRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
