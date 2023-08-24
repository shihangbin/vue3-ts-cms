<script lang="ts" setup>
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'

const onExit = () => {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 跳回到login
  router.push('/login')
}
</script>

<template>
  <div class="main">
    <h2>main</h2>
    <el-button type="primary" @click="onExit">退出登录</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
