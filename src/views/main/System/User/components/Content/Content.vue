<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'

const systemStore = useSystemStore()
systemStore.postUserListAction()

const { userList } = storeToRefs(systemStore)
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button class="pagination" type="primary">新建列表</el-button>
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
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center" />
        <el-table-column prop="updateAt" label="更新时间" align="center" />
        <el-table-column label="操作" align="center" width="170">
          <el-button size="small" type="primary" text icon="Edit">
            编辑
          </el-button>
          <el-button size="small" type="danger" text icon="Delete">
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">底部</div>
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
}
</style>
