<script lang="ts" setup>
import { ref } from 'vue'
import MainMenu from '@/components/MainMenu/MainMenu.vue'
import MainHeader from '@/components/MainHeader/MainHeader.vue'

// 处理main-header 中的折叠变化
const isCollapse = ref(false)
const onFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="aside" :width="isCollapse ? '65px' : '210px'">
        <main-menu :is-fold="isCollapse" />
      </el-aside>
      <el-container class="content">
        <el-header class="header" height="50px">
          <main-header @fold-change="onFoldChange" />
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    background-color: #eff1f5;
    .aside {
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #0c1f36;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      transition: all 0.5s ease;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .content {
      .header {
        background-color: #fff;
      }
      // .main {
      //   background-color: #fe8076;
      // }
    }
  }
}
</style>
