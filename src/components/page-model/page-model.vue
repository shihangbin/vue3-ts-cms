<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { useSystemStore } from '@/store/main/system/system'

interface IProps {
  modelConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()

const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

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
      const item = props.modelConfig.formItems.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
const systemStore = useSystemStore()

const newConfirmClick = () => {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 新建
    systemStore.newPageListAction(props.modelConfig.pageName, infoData)
  }
}

defineExpose({ setModelVisible })
</script>

<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modelConfig.header.newTitle : modelConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-form-item v-bind="item">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
