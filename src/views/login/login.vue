<script lang="ts" setup>
import { sjRequest } from '@/service'

sjRequest
  .get({
    url: '/goods?pagenum=1&pagesize=2'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<style lang="scss" scoped></style>
