<script lang="ts" setup>
import { ref } from 'vue'

const isRememberPwd = ref(false)

const activeName = ref('account')
const handeleLogin = () => {
  if (activeName.value === 'account') {
    console.log('账号登录')
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
          <div class="account">账号</div>
          <div class="password">密码</div>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <div class="account">账号</div>
          <div class="password">密码</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button class="btn" type="primary" size="large" @click="handeleLogin"
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
    margin-bottom: 15px;
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
