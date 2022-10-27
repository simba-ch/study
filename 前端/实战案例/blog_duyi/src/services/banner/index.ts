import axios from 'axios';

export async function getBanner() {
  const token = localStorage.getItem('BLOG_DUYI');
  if (token) {
    return await axios.get('/api/banner').then((res) => res.data);
  }
  return null;
}

export async function putBanner() {
  const token = localStorage.getItem('BLOG_DUYI');

  return await axios
    .post('/api/banner', {
      headers: {
        Authorization: '	Bearer ' + token,
      },
    })
    .then((res) => res.data);
}

export async function upload() {
  const token = localStorage.getItem('BLOG_DUYI');
  return await axios
    .post('/api/upload', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data);
}
