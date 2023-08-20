<script lang="ts" setup>
import { sjRequest } from '@/service'

sjRequest
  .get({
    url: '/goods/category/count'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<template>
  <div class="login">
    <h2>login</h2>
    <el-row class="mb-4">
      <el-button type="default">Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
