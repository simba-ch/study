import axios from 'axios';

export async function getCategories(): Promise<Categories[]> {
  return await axios.get('/api/categories');
}

export async function uploadImage(file: any): Promise<object> {
  return await axios.post('https://img.kuibu.net/upload/backblaze', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function addNews(news: any): Promise<object> {
  return await axios.post('/api/news', JSON.stringify(news), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// ========================================

export async function getUsersInfo(): Promise<[]> {
  return await axios.get('/api/users?_expand=role');
}

export async function patchRoleState(id: number, state: object) {
  return await axios.patch(`/api/users/${id}`, JSON.stringify(state), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteUser(id: number) {
  return await axios.delete(`/api/users/${id}`);
}

export async function getRoles(): Promise<[]> {
  return await axios.get('/api/roles');
}

export async function getRegions() {
  return await axios.get('/api/regions');
}

export async function modifyUser(id: number, user: object) {
  return await axios.patch(`/api/users/${id}`, JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteRole(id: number) {
  return await axios.delete(`/api/roles/${id}`);
}

export async function getRoleList(): Promise<[]> {
  return await axios.get('/api/rights?_embed=children');
}

export async function modifyRoleRights(id: number, rights: string[]) {
  return await axios.patch(`/api/roles/${id}`, JSON.stringify({ rights }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteRight(id: number) {
  return await axios.delete(`/api/rights/${id}`);
}

export async function deleteChildren(id: number) {
  return await axios.delete(`/api/children/${id}`);
}

export async function modifyRightPagepermisson(id: number, pagepermisson: 0 | 1) {
  return await axios.patch(`/api/rights/${id}`, JSON.stringify({ pagepermisson }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function modifyChildrenPagepermisson(id: number, pagepermisson: 0 | 1) {
  return await axios.patch(`/api/children/${id}`, JSON.stringify({ pagepermisson }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
