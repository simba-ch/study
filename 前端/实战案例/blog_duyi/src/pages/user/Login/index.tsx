import {
  LockOutlined,
  UserOutlined,
  AlignRightOutlined
} from '@ant-design/icons';
import { Alert, Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import { login } from '@/services/user';
import { getCaptcha } from "@/services/user";
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [captcha, setCaptcha] = useState('')
  const [loginState, setLoginState] = useState<{ code?: number, msg?: string, data?: any }>({})
  const { initialState, setInitialState } = useModel('@@initialState');

  const updateCaptcha = async () => {
    const result = await getCaptcha();
    setCaptcha(result)
  }

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  useEffect(() => { updateCaptcha() }, [])
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const result = await login(values);
      let { data, headers: { authentication } } = result
      if (typeof data === 'string') data = JSON.parse(data)
      if (data.code === 0 && data.data) {

        localStorage.setItem('BLOG_DUYI', authentication)

        const defaultLoginSuccessMessage = '登录成功！'
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        setLoginState({})
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败更新验证码,设置登陆状态
      updateCaptcha()
      setLoginState(data)

    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <LoginForm
          onFinish={async (values: API.LoginParams) => {
            await handleSubmit(values as API.LoginParams);
          }}
          style={{
            margin: '160px auto'
          }}
        >
          {loginState.code === 406 && (
            <LoginMessage
              content={loginState.msg ? loginState.msg : ''}
            />
          )}
          {loginState.code === 0 && (
            <LoginMessage
              content={loginState.msg ? loginState.msg : '账号或密码错误'}
            />
          )}
          <h3 style={{
            fontSize: '26px',
            color: '#eee',
            margin: '0 auto 40px auto',
            textAlign: 'center',
            fontWeight: 700
          }}>个人空间后台管理系统</h3>
          <>
            <ProFormText
              name="loginId"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder='请输入管理员账号'
              rules={[
                {
                  required: true,
                  message: "请输入管理员账号!"
                },
              ]}
            />
            <ProFormText.Password
              name="loginPwd"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder='请输入密码'
              rules={[
                {
                  required: true,
                  message: "请输入密码！"
                },
              ]}
            />
            <Row>
              <Col span={12}> <ProFormText
                name="captcha"
                fieldProps={{
                  size: 'large',
                  prefix: <AlignRightOutlined className={styles.prefixIcon} />,
                }}
                placeholder='请输入验证码'
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ]}
              /></Col>
              <Col span={12}>{
                <span onClick={updateCaptcha} dangerouslySetInnerHTML={{
                  __html: captcha
                }}></span>
              }</Col>
            </Row>
          </>

          <div
            style={{
              marginBottom: 24,

            }}
          >
            <ProFormCheckbox noStyle name="remember">
              <span style={{
                color: '#606266'
              }}>七天免登陆</span>
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </div >
  );
};

export default Login;
