export type IUser = {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystem {
  userList: IUser[]
  userTotalCount: number
}
