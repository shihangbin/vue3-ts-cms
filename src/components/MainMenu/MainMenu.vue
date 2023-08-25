<script lang="ts" setup>
import { useLoginStore } from '@/store/login/login'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" />
      <h2 v-show="!isFold" class="title">三九管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        default-active="39"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <!-- 字符串转成组件: "el-icon-setting" <el-icon><Monitor /></el-icon>-->
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <template v-if="item.icon"></template>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="String(subitem.id)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-menu {
  width: 100%;
  .logo {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 50px;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    background-color: #0c1f36;
    img {
      width: 25px;
      height: 25px;
      margin: 0 20px;
    }
    .title {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }
  }
  .menu {
    height: 100%;
    .el-menu {
      border-right: none;
      user-select: none;
    }
    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;
        &:hover {
          color: #fff;
        }
      }
      .el-menu-item.is-active {
        background-color: #0b5dbe;
      }
    }
  }
}
</style>
