import { request } from 'umi';

export async function getTodolist() {
  return await request('/api/todolist');
}

export async function setTodolist(id: number, status: string) {
  return await request('/api/todolist', {
    method: 'put',
    data: {
      id,
      status,
    },
  });
}

export async function addTodolist(title: string) {
  return await request('/api/todolist', {
    method: 'post',
    data: {
      title,
    },
  });
}
