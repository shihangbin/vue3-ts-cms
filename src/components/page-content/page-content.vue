<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'
import { formatUTC } from '@/utils/formatTime'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()

const pageSize = ref(10)
const currentPage = ref(1)

const fetchPageListData = (formatData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }

  const queryInfo = { ...info, ...formatData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
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
  systemStore.deletePageListByIdAction(props.contentConfig.pageName, id)
}
const editBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button @click="newBtnClick" class="pagination" type="primary">
        {{ contentConfig.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'btnClick'">
            <el-table-column v-bind="item" align="center">
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
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
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
