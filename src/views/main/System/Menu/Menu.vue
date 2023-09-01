<script lang="ts" setup>
import pageContent from '@/components/page-content/page-content.vue'

import contentConfig from './config/content.config'
</script>

<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<style lang="scss" scoped></style>
