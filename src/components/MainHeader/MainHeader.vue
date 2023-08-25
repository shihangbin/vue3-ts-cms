<script lang="ts" setup>
import { ref } from 'vue'

import MainHeaderRight from './components/MainHeaderRight.vue'
import MainBreadcrumb from './components/MainBreadcrumb.vue'

const isFold = ref(false)

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

const onMenuIcon = () => {
  // 1.内部改变数据
  isFold.value = !isFold.value
  // 2.将事件传递出去
  emit('foldChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="left">
      <div class="menu-icon" @click="onMenuIcon">
        <el-icon size="25px">
          <component :is="isFold ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
      <div class="content">
        <div class="Breadcrumb">
          <main-breadcrumb></main-breadcrumb>
        </div>
      </div>
    </div>
    <div class="right">
      <main-header-right></main-header-right>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  height: 100%;
  .left {
    display: flex;
    align-items: center;
    height: 100%;
    .menu-icon {
      height: 100%;
      padding: 15px;
      color: #001529;
      vertical-align: bottom;
      box-sizing: border-box;
      &:hover {
        background-color: #f3f3f3;
      }
    }
    .content {
      cursor: context-menu;
    }
  }
  .right {
    height: 100%;
  }
}
</style>
