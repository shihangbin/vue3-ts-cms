import { defineStore } from 'pinia'
import { postUserListData } from '@/service/main/system/stytem'
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
    async postUserListAction() {
      const userListResult = await postUserListData()
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    }
  }
})
