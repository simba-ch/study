import { Button, Result } from 'antd';
import { Link } from 'umi';
import React from 'react';
import type { RouteChildrenProps } from 'react-router';

import styles from './style.less';
const hash = {
  'qq.com': 'http://mail.qq.com',
  'gmail.com': 'http://mail.google.com',
  'sina.com': 'http://mail.sina.com.cn',
  '163.com': 'http://mail.163.com',
  '126.com': 'http://mail.126.com',
  'yeah.net': 'http://www.yeah.net/',
  'sohu.com': 'http://mail.sohu.com/',
  'tom.com': 'http://mail.tom.com/',
  'sogou.com': 'http://mail.sogou.com/',
  '139.com': 'http://mail.10086.cn/',
  'hotmail.com': 'http://www.hotmail.com',
  'live.com': 'http://login.live.com/',
  'live.cn': 'http://login.live.cn/',
  'live.com.cn': 'http://login.live.com.cn',
  '189.com': 'http://webmail16.189.cn/webmail/',
  'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
  'yahoo.cn': 'http://mail.cn.yahoo.com/',
  'eyou.com': 'http://www.eyou.com/',
  '21cn.com': 'http://mail.21cn.com/',
  '188.com': 'http://www.188.com/',
  'foxmail.com': 'http://www.foxmail.com',
  'outlook.com': 'http://www.outlook.com'
}


// const actions = (
//   <div className={styles.actions}>
//     <a href="">
//       <Button size="large" type="primary">
//         <span>查看邮箱</span>
//       </Button>
//     </a>
//     <Link to="/">
//       <Button size="large">返回首页</Button>
//     </Link>
//   </div>
// );

export type LocationState = Record<string, unknown>;

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => {
  // const email = location.state
  //   ? (location.state as LocationState).account
  //   : 'AntDesign@example.com';
  let src = '';
  const email = location.state
    ? (location.state as LocationState).account
    : 'AntDesign@example.com';
  if (typeof email === 'string') {
    const _mail = email.split('@')[1];
    for (const domain in hash) {
      if (domain == _mail) {
        src = hash[_mail];
      }
    }
  }

  const actions = (
    <div className={styles.actions}>
      <a href={src}>
        <Button size="large" type="primary">
          <span>查看邮箱</span>
        </Button>
      </a>
      <Link to="/">
        <Button size="large">返回首页</Button>
      </Link>
    </div>
  );

  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{email} 注册成功</span>
        </div>
      }
      subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
      extra={actions}
    />
  );
};

// export default RegisterResult;
export default RegisterResult;

