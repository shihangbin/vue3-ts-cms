<script lang="ts" setup>
import { ref } from 'vue'
import Search from './components/Search.vue'
import Content from './components/Content.vue'
import Model from './components/Model.vue'

const contentRef = ref<InstanceType<typeof Content>>()
const handleQueryClick = (formatData: any) => {
  contentRef.value?.fetchUserListData(formatData)
}
const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}

const ModelRef = ref<InstanceType<typeof Model>>()
const handleNewBtnClick = () => {
  ModelRef.value?.setModelVisible()
}
const handleEditClick = (itemData: any) => {
  ModelRef.value?.setModelVisible(false, itemData)
}
</script>

<template>
  <div class="user">
    <search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditClick"
    />
    <model ref="ModelRef" />
  </div>
</template>

<style lang="scss" scoped>
.user {
  overflow: hidden;
}
</style>
