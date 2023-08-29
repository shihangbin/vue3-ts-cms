<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'
import { formatUTC } from '@/utils/formatTime'

const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const pageSize = ref(10)
const currentPage = ref(1)

const fetchPageListData = (formatData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formatData }
  systemStore.postPageListAction('department', queryInfo)
}
fetchPageListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

const newBtnClick = () => {
  emit('newClick')
}
const deleteBtnClick = (id: number) => {
  systemStore.deletePageListByIdAction('department', id)
}
const editBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button @click="newBtnClick" class="pagination" type="primary">
        新建部门
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column
          prop="name"
          label="部门名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="leader"
          label="部门领导"
          width="150"
          align="center"
        />
        <el-table-column
          prop="parentId"
          label="上级部门"
          width="150"
          align="center"
        />
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
        :total="pageTotalCount"
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
