<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'

const searchFrom = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})
// 重置
const formRef = ref<InstanceType<typeof ElForm>>()
const onReset = () => {
  formRef.value?.resetFields()
}
const onQuery = () => {
  console.log(111)
}
</script>

<template>
  <div class="search">
    <el-form :model="searchFrom" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20" align="bottom">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchFrom.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchFrom.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchFrom.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchFrom.enable"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchFrom.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button @click="onReset" plain size="large" :icon="Refresh"
        >重置</el-button
      >
      <el-button
        @click="onQuery"
        type="primary"
        plain
        size="large"
        :icon="Search"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  .el-form-item {
    padding: 10px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
  }
}
</style>
