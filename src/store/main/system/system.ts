import { defineStore } from 'pinia'
import {
  deleteUserListData,
  editUserListData,
  newUserData,
  postUserListData,
  postPageListData,
  deletePageById,
  editPageListData,
  newPageData
} from '@/service/main/system/stytem'
import type { ISystem } from './type'

export const useSystemStore = defineStore('system', {
  // 为了完整类型推理，推荐使用箭头函数
  state: (): ISystem => {
    return {
      userList: [],
      userTotalCount: 0,

      pageList: [],
      pageTotalCount: 0
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
    },

    // 页面的数据
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageListByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, userInfo: any) {
      const editResult = await editPageListData(pageName, id, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageListAction(pageName: string, userInfo: any) {
      const newListResult = await newPageData(pageName, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})
