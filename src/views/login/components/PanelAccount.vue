<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import { useLoginStore } from '@/store/login/login'

interface IRuleForm {
  name: string
  password: string
}
const account = reactive<IRuleForm>({
  name: '',
  password: ''
})

const accountRules: FormRules = {
  name: [
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

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户账号密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送请求
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('验证失败')
    }
  })
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
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>