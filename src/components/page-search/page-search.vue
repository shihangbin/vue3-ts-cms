<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'

// 自定义事件
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])

const props = defineProps<IProps>()
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

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
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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
