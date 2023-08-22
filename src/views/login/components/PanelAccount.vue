<script lang="ts" setup>
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

interface IRuleForm {
  accountID: string
  password: string
}
const account = reactive<IRuleForm>({
  accountID: '',
  password: ''
})

const accountRules: FormRules = {
  accountID: [
    { required: true, message: '必须输入账号~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须6~20位数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须要6位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}

const loginAction = () => {
  console.log('panel', account.accountID, account.password)
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="panel-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
    >
      <el-form-item label="账号" prop="accountID">
        <el-input v-model="account.accountID" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
