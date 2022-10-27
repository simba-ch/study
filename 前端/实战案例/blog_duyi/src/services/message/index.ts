import axios from 'axios';

const TOKEN = localStorage.getItem('BLOG_DUYI');
export async function getMessage(page, limit) {
  return await axios
    .get('/api/message', {
      params: {
        page,
        limit,
      },
    })
    .then((res) => res.data);
}

export async function deleteMessage(id: string) {
  return await axios
    .delete(`/api/message/${id}`, {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    })
    .then((res) => res.data);
}
