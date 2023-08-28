import { defineStore } from 'pinia'
import {
  deleteUserListData,
  editUserListData,
  newUserData,
  postUserListData
} from '@/service/main/system/stytem'
import type { ISystem } from './type'

export const useSystemStore = defineStore('system', {
  // 为了完整类型推理，推荐使用箭头函数
  state: (): ISystem => {
    return {
      userList: [],
      userTotalCount: 0
    }
  },
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserListActive(id: number) {
      const userListResult = await deleteUserListData(id)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserListAction(userInfo: any) {
      const newListResult = await newUserData(userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserListData(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    }
  }
})
