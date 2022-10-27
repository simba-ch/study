import axios from 'axios';

export async function getBlog(params = {}) {
  return await axios
    .get('/api/blog', {
      params,
    })
    .then((res) => res.data);
}

export async function deleteBlog(id: string) {
  return await axios
    .delete(`/api/blog/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('BLOG_DUYI'),
      },
    })
    .then((res) => res.data);
}

export async function addBlogType(data: { name: string; order: string }) {
  const token = localStorage.getItem('BLOG_DUYI');
  return await axios
    .post('/api/blogtype', JSON.stringify(data), {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
}

export async function getAllBlogType() {
  return await axios.get('/api/blogtype').then((res) => res.data);
}

export async function deleteBlogType(id: string) {
  const token = localStorage.getItem('BLOG_DUYI');
  return await axios
    .delete(`/api/blogtype/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data);
}

export async function putBlogType(id: string, data: { name: string; order: string }) {
  const token = localStorage.getItem('BLOG_DUYI');
  return await axios
    .put(`/api/blogtype/${id}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => res.data);
}

export async function publishBlog(body: any) {
  return await axios
    .post('/api/blog', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('BLOG_DUYI'),
      },
    })
    .then((res) => res.data);
}

export async function getOneBlog(id: string) {
  return await axios.get(`/api/blog/${id}`).then((res) => res.data);
}

export async function modifyBlog(id: string, body: any) {
  return await axios
    .put(`/api/blog/${id}`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('BLOG_DUYI'),
      },
    })
    .then((res) => res.data);
}
