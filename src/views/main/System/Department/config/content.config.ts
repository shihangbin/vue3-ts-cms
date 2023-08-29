const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    {
      type: 'selection',
      label: '选择',
      width: '55px'
    },
    {
      type: 'normal',
      label: 'ID',
      prop: 'id',
      width: '70px'
    },
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      width: '150px'
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      width: '150px'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
      width: '150px'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'btnClick',
      label: '操作',
      width: '170px'
    }
  ]
}

export default contentConfig
