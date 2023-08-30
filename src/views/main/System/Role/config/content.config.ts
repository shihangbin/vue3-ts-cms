const config = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建列表'
  },
  propsList: [
    {
      type: 'selection',
      with: '55px'
    },
    {
      type: 'normal',
      label: 'ID',
      prop: 'id',
      with: '150px'
    },
    {
      type: 'normal',
      label: '角色名称',
      prop: 'name',
      with: '150px'
    },
    {
      type: 'normal',
      label: '权限介绍',
      prop: 'intro',
      with: '150px'
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
      with: '150px'
    }
  ]
}

const contentConfig = config

export default contentConfig
