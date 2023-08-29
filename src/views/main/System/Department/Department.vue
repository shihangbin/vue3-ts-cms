<script lang="ts" setup>
import { ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

const contentRef = ref<InstanceType<typeof PageContent>>()
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchPageListData()
}

const modelRef = ref<InstanceType<typeof PageModel>>()
const handleNewClick = () => {
  modelRef.value?.setModelVisible()
}
const handleEditClick = (itemData: any) => {
  modelRef.value?.setModelVisible(false, itemData)
}
</script>

<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-model :model-config="modelConfig" ref="modelRef"></page-model>
  </div>
</template>

<style lang="scss" scoped></style>
