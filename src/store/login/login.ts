import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'

export const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
    }
  }
})
