import axios from 'axios';

const TOKEN = localStorage.getItem('BLOG_DUYI');
export async function getComment() {
  return await axios.get('/api/comment').then((res) => res.data);
}

export async function deleteComment(id: string) {
  return await axios
    .delete(`/api/comment/${id}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    })
    .then((res) => res.data);
}
