export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        path: '/',
        redirect: '/home',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: '首页',
    icon: 'HomeOutlined',
    component: './Home',
  },
  {
    path: '/user-manage',
    name: '用户管理',
    icon: 'TeamOutlined',
    routes: [
      {
        path: '/user-manage',
        redirect: '/user-manage/list',
      },
      {
        path: '/user-manage/list',
        name: '用户列表',
        icon: 'TeamOutlined',
        component: './user/UserList',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/right-manage',
    name: '权限管理',
    icon: 'UserSwitchOutlined',
    routes: [
      {
        path: '/right-manage',
        redirect: '/right-manage/role/list',
      },
      {
        path: '/right-manage/role/list',
        name: '角色列表',
        icon: 'TeamOutlined',
        component: './rightManage/RoleList',
      },
      {
        path: '/right-manage/right/list',
        name: '权限列表',
        icon: 'AlignLeftOutlined',
        component: './rightManage/RightList',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/news-manage',
    name: '新闻管理',
    icon: 'GlobalOutlined',
    routes: [
      {
        path: '/news-manage',
        redirect: '/news-manage/add',
      },
      {
        path: '/news-manage/add',
        name: '撰写新闻',
        icon: 'FileAddOutlined',
        component: './newsManage/Add',
      },
      {
        path: '/news-manage/draft',
        name: '草稿箱',
        icon: 'FileDoneOutlined',
        component: './newsManage/Draft',
      },
      {
        path: '/news-manage/category',
        name: '新闻分类',
        icon: 'AlignLeftOutlined',
        component: './newsManage/Category',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/audit-manage',
    name: '审核管理',
    icon: 'ApartmentOutlined',
    routes: [
      {
        path: '/audit-manage',
        redirect: '/audit-manage/audit',
      },
      {
        path: '/audit-manage/audit',
        name: '审核新闻',
        icon: 'CarryOutOutlined',
        component: './auditManage/Audit',
      },
      {
        path: '/audit-manage/list',
        name: '审核列表',
        icon: 'AlignLeftOutlined',
        component: './auditManage/AuditList',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/publish-manage',
    name: '发布管理',
    icon: 'SolutionOutlined',
    routes: [
      {
        path: '/publish-manage',
        redirect: '/publish-manage/unpublished',
      },
      {
        path: '/publish-manage/unpublished',
        name: '待发布',
        icon: 'ReloadOutlined',
        component: './publishManage/Unpublished',
      },
      {
        path: '/publish-manage/published',
        name: '已发布',
        icon: 'UploadOutlined',
        component: './publishManage/Published',
      },
      {
        path: '/publish-manage/sunset',
        name: '已下线',
        icon: 'DownloadOutlined',
        component: './publishManage/Sunset',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
