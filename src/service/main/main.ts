import { sjRequest } from '..'

export function getEntireRoles() {
  return sjRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return sjRequest.post({
    url: '/department/list'
  })
}
