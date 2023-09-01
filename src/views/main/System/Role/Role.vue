<script lang="ts" setup>
import { ref } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import { userMainStore } from '@/store/main/main'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageModel from '@/hooks/usePageModel'
import usePageConfig from '@/hooks/usePageConfig'
import { storeToRefs } from 'pinia'

const { contentRef, handleQueryClick, handleResetClick } = usePageConfig()
const { modelRef, handleEditClick, handleNewClick } = usePageModel()

const mainStor = userMainStore()
const { entireMenus } = storeToRefs(mainStor)

const otherInfo = ref({})
const handleElTreeCheck = (data1: any, data2: any) => {
  const menusList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menusList }
}
</script>

<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    ></page-content>
    <page-model
      :model-config="modelConfig"
      :other-info="otherInfo"
      ref="modelRef"
    >
      <template #menulist>
        <el-tree
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<style lang="scss" scoped></style>
