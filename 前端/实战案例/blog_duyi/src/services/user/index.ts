import axios from 'axios';
export async function getCaptcha() {
  return await axios.get('/res/captcha').then((res) => {
    return res.data;
  });
}

export async function login(body: {
  loginId: string;
  loginPwd: string;
  captcha: string;
  remember?: boolean;
}) {
  return await axios.post('/api/admin/login', {
    ...body,
    remember: body.remember ? '7' : '1',
  });
}

export async function getUserInfo() {
  const token = localStorage.getItem('BLOG_DUYI');
  if (token)
    return await axios.get('/api/admin/whoami', {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
  return Promise.reject(new Error('请先登录'));
}

export async function getUserSet() {
  return await axios.get('/api/setting').then((res) => res.data);
}

export async function userLoginOut() {
  localStorage.removeItem('BLOG_DUYI');
  return true;
}

export async function changeUserInfo(body: any) {
  const token = localStorage.getItem('BLOG_DUYI');
  return axios
    .put('/api/admin', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      },
    })
    .then((res) => res.data);
}


export async function modifyUserInfo(body: any) {
  const token = localStorage.getItem('BLOG_DUYI');
  return axios
    .put('/api/setting', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      },
    })
    .then((res) => res.data);
}
