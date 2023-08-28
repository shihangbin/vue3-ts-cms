<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'
import { formatUTC } from '@/utils/formatTime'

const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const pageSize = ref(10)
const currentPage = ref(1)

const fetchUserListData = (formatData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formatData }
  systemStore.postUserListAction(queryInfo)
}
fetchUserListData()

const { userList, userTotalCount } = storeToRefs(systemStore)

const enableData = ref(1)
const isEnable = (itemData: any) => {
  if (enableData.value === 1) {
    // console.log('关闭', itemData.enable, enableData.value)
    systemStore.editUserDataAction(itemData.id, { enable: enableData.value })
    enableData.value = 0
  } else if (enableData.value === 0) {
    // console.log('开启', itemData.enable, enableData.value)
    systemStore.editUserDataAction(itemData.id, { enable: enableData.value })
    enableData.value = 1
  }
}

const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}

const newBtnClick = () => {
  emit('newClick')
}
const deleteBtnClick = (id: number) => {
  systemStore.deleteUserListActive(id)
}
const editBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({ fetchUserListData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button @click="newBtnClick" class="pagination" type="primary">
        新建列表
      </el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column
          prop="name"
          label="用户名"
          width="150"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="150"
          align="center"
        />
        <el-table-column
          prop="cellphone"
          label="手机号码"
          width="150"
          align="center"
        />
        <el-table-column prop="enable" label="状态" width="100" align="center">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              @click="isEnable(scope.row)"
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template #default="scope">
            <el-button
              @click="editBtnClick(scope.row)"
              size="small"
              type="primary"
              text
              icon="Edit"
            >
              编辑
            </el-button>
            <el-button
              @click="deleteBtnClick(scope.row.id)"
              size="small"
              type="danger"
              text
              icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  color: #000;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;
    .title {
      font-weight: 700;
      font-size: 20px;
    }
  }
  .Pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
