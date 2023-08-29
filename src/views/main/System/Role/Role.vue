<script lang="ts" setup>
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
</script>

<template>
  <div class="role">
    <page-search :search-config="searchConfig"></page-search>
  </div>
</template>

<style lang="scss" scoped></style>
