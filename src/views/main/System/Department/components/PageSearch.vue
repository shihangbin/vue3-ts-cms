<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

interface ISearchForm {
  name: string
  leader: string
  createAt: any
}
const searchForm = reactive<ISearchForm>({
  name: '',
  leader: '',
  createAt: ''
})
// 重置
const formRef = ref<InstanceType<typeof ElForm>>()
const onReset = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}
const onQuery = () => {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20" align="bottom">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的部门名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入查询的部门领导"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
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
      <el-button @click="onReset" plain size="large" :icon="Refresh">
        重置
      </el-button>
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
