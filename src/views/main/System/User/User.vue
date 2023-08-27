<script lang="ts" setup>
import Search from './components/Search/Search.vue'
import Content from './components/Content/Content.vue'
</script>

<template>
  <div class="user">
    <search />
    <content />
  </div>
</template>

<style lang="scss" scoped>
.user {
  overflow: hidden;
}
</style>
