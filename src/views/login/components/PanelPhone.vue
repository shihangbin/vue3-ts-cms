<script lang="ts" setup>
import { reactive } from 'vue'

const phone = reactive({
  number: '暂时不支持',
  code: ''
})
</script>

<template>
  <div class="panel-phone">
    <el-form :label-width="60" size="large">
      <el-form-item label="手机号">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verity-code">
          <el-input v-model="phone.code" />
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.panel-phone {
  .verity-code {
    display: flex;
    .btn {
      margin-left: 8px;
    }
  }
}
</style>
