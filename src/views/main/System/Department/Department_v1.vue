<script lang="ts" setup>
import { ref } from 'vue'
import PageSearch from './components/PageSearch.vue'
import PageContent from './components/PageContent.vue'
import PageModel from './components/PageModel.vue'

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
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-model ref="modelRef"></page-model>
  </div>
</template>

<style lang="scss" scoped></style>
