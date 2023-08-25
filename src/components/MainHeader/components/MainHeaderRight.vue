<script lang="ts" setup>
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const onExit = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<template>
  <div class="main-header-right">
    <div class="icon">
      <span>
        <el-icon><Message /></el-icon
      ></span>
      <span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span
        ><el-icon><Search /></el-icon
      ></span>
    </div>

    <div class="user-infos">
      <el-dropdown>
        <span class="info">
          <el-avatar
            :size="35"
            src="https://img.xbin.cn/images/2023/08/26-03-07-4ea6ad.jpg"
          />
          <span class="name">三九</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onExit">
              <el-icon><CircleClose /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><User /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-header-right {
  display: flex;
  align-items: center;
  height: 100%;
  .icon {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 22px;
    color: #001529;
    span {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
  .user-infos {
    display: flex;
    align-items: center;
    height: 100%;
    .info {
      display: flex;
      align-items: center;
      margin: 0 25px 0 20px;
      cursor: pointer;
      .name {
        font-size: 16px;
        margin: 0 10px;
        box-sizing: border-box;
      }
      &:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
