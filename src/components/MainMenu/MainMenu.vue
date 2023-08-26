<script lang="ts" setup>
import router from '@/router'
import { useLoginStore } from '@/store/login/login'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const onItem = (item: any) => {
  const url = item.url
  router.push(url)
}
</script>

<template>
  <div class="main-menu">
    <el-affix :offset="0">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="" />
        <h2 v-show="!isFold" class="title">三九管理系统</h2>
      </div>
    </el-affix>
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
              <el-menu-item
                :index="String(subitem.id)"
                @click="onItem(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
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
    // width: 100%;
    height: 50px;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    background-color: #0c1f36;
    // background-color: pink;
    box-sizing: border-box;
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
      transition: all 0.5s ease;
    }
  }
  .menu {
    height: 100%;
    box-sizing: border-box;
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
