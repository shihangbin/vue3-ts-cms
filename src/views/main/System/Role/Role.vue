<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'

import usePageModel from '@/hooks/usePageModel'
import usePageConfig from '@/hooks/usePageConfig'

const { contentRef, handleQueryClick, handleResetClick } = usePageConfig()
const { modelRef, handleEditClick, handleNewClick } = usePageModel()
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
    <page-model :model-config="modelConfig" ref="modelRef"></page-model>
  </div>
</template>

<style lang="scss" scoped></style>
