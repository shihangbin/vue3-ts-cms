const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '150px' },
    { label: '级别', prop: 'type', width: '100px' },
    { label: '菜单url', prop: 'url', width: '120px' },
    { label: '菜单icon', prop: 'icon', width: '150px' },
    { label: '排序', prop: 'sort', width: '100px' },
    { label: '权限', prop: 'permission', width: '100px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'btnClick', label: '操作', width: '200px' }
  ],
  childrenTree: {
    rowKey: 'id'
  }
}

export default contentConfig
