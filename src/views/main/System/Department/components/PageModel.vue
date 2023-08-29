<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { userMainStore } from '@/store/main/main'
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

const setModelVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
const systemStore = useSystemStore()
const mainStore = userMainStore()
const { entireDepartments } = storeToRefs(mainStore)

const newConfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 新建
    systemStore.newPageListAction('department', formData)
  }
}

defineExpose({ setModelVisible })
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请输入上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button @click="newConfirmClick" type="primary"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.model {
  .form {
    padding: 0 20px;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
