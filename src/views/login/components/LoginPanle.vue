<script lang="ts" setup>
import { ref } from 'vue'
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
import { localCache } from '@/utils/cache'

const isRememberPwd = ref<boolean>(true)
// 拿到组件实例的返回值类型
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const activeName = ref<string>('account')

const handlerLogin = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRememberPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<template>
  <div class="login-panle">
    <h1 class="title">三九后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef"></panel-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <panel-phone></panel-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button class="btn" type="primary" size="large" @click="handlerLogin"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-panle {
  width: 320px;
  .title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 700;
    color: #000;
  }
  .tabs {
    .label {
      display: flex;
      align-items: center;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    .btn {
      width: 100%;
    }
  }
}
</style>
