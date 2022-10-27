import axios from 'axios';

const TOKEN = localStorage.getItem('BLOG_DUYI');
export async function getMeInfo() {
  return await axios.get('/api/about').then((res) => res.data);
}

export async function setMeInfo(body: any) {
  return await axios
    .post(`/api/about`, JSON.stringify({ url: body }), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
    })
    .then((res) => res.data);
}
