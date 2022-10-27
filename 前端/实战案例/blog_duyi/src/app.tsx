import { ProBreadcrumb, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RunTimeLayoutConfig, } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { getUserInfo } from '@/services/user';
import HeaderContent from './components/HeaderContent';
import axios from 'axios';
// import { Provider } from "react-redux";
// import store from "./redux";
// import Content from './components/Content';
const loginPath = '/user/login';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么

  return config;
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么

  return response
});

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  collapsed?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {

  const fetchUserInfo = async () => {
    try {
      const msg = await getUserInfo().then(res => res.data);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const onCollapse = (collapsed: boolean): void => {
    setInitialState({ ...initialState, collapsed });
  };
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onCollapse: onCollapse,
    collapsed: initialState?.collapsed,
    collapsedButtonRender: false,
    headerContentRender: () => (

      <HeaderContent collapse={initialState?.collapsed} onCollapse={onCollapse}>
        <ProBreadcrumb />
      </HeaderContent >
    ),
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {

        history.push(loginPath);
      }
    },
    // location: { pathname: history.location.pathname },
    breadcrumbRender: (routers = []) => {
      return [
        ...routers,
      ]
    },
    // menuDataRender: (routes) => {
    //   return routes
    // },
    // pageContainer: {
    //   breadcrumbRender: false
    // },
    menuHeaderRender: undefined,
    title: '个人博客',
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return children
    },
    ...initialState?.settings,
  };
};
