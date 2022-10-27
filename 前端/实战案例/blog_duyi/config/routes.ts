export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/PersonalCenter',
    component: './personalCenter',
  },
  {
    path: '/dashboard',
    name: '控制台',
    icon: 'dashboard',
    component: './dashboard',
  },
  {
    path: '/banner',
    icon: 'StarOutlined',
    name: '首页标语',
    component: './banner',
  },
  {
    path: '/blogManage',
    icon: 'EditFilled',
    name: '文章管理',
    routes: [
      {
        name: '文章列表',
        icon: 'CopyOutlined',
        path: '/blogManage/blogList',
        component: './blogManage/blogList',
      },
      {
        name: '文章分类',
        icon: 'AppstoreOutlined',
        path: '/blogManage/blogType',
        component: './blogManage/blogType',
      },
      {
        name: '添加文章',
        icon: 'FileAddOutlined',
        path: '/blogManage/addBlog',
        component: './blogManage/addBlog',
      },
      {
        name: '编辑文章',
        path: '/blogManage/editBlog/:id',
        component: './blogManage/editBlog',
        hideInMenu: true,
      },
      {
        path: '/blogManage',
        redirect: '/blogManage/blogList',
      },
    ],
  },
  {
    path: '/projectManage',
    name: '项目管理',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/projectManage',
        redirect: '/projectManage/projectList',
      },
      {
        name: '项目列表',
        icon: 'BookOutlined',
        path: '/projectManage/projectList',
        component: './projectManage/projectList',
      },
      {
        name: '添加项目',
        icon: 'PlusOutlined',
        path: '/projectManage/addProject',
        component: './projectManage/addProject',
      },
    ],
  },
  {
    name: '评论管理',
    icon: 'CommentOutlined',
    path: '/comment',
    component: './comment',
  },
  {
    name: '留言板管理',
    icon: 'MessageOutlined',
    path: '/message',
    component: './message',
  },
  {
    name: '关于我',
    icon: 'UserOutlined',
    path: '/aboutme',
    component: './aboutme',
  },
  {
    name: '设置',
    icon: 'SettingOutlined',
    path: '/setting',
    component: './setting',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: '404',
  },
];
