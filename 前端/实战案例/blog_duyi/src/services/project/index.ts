import axios from 'axios';

const TOKEN = localStorage.getItem('BLOG_DUYI');
export async function getProjectList() {
  return await axios.get('/api/project').then((res) => res.data);
}

export async function deleteProject(id: string) {
  return await axios
    .delete(`/api/project/${id}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    })
    .then((res) => res.data);
}

export async function createProject(body: any) {
  return await axios
    .post('/api/project', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
    })
    .then((res) => res.data);
}

export async function modifyProject(id:string,body:any) {
  return await axios
  .put(`/api/project/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  })
  .then((res) => res.data);
}