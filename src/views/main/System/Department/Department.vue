<script lang="ts" setup>
import { ref, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModel from '@/components/page-model/page-model.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modelConfig from './config/model.config'
import { userMainStore } from '@/store/main/main'
import usePageConfig from '@/hooks/usePageConfig'
import usePageModel from '@/hooks/usePageModel'

const modelConfigRef = computed(() => {
  const mainStore = userMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options?.push(...department)
    }
  })
  return modelConfig
})

const { contentRef, handleQueryClick, handleResetClick } = usePageConfig()

const { modelRef, handleEditClick, handleNewClick } = usePageModel()
</script>

<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    >
    </page-search>
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </page-content>
    <page-model :model-config="modelConfigRef" ref="modelRef"></page-model>
  </div>
</template>

<style lang="scss" scoped></style>
