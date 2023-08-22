<script lang="ts" setup>
import { reactive } from 'vue'

const phone = reactive({
  name: '',
  password: ''
})
</script>

<template>
  <div class="panel-phone">
    <el-form :label-width="60">
      <el-form-item label="账号">
        <el-input v-model="phone.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model="phone.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
