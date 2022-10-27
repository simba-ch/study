import { TableListItem } from '@/pages/user/UserList/data';
import axios from 'axios';
import { Role } from '@/pages/user/UserList/data';
import { IFRight } from '@/pages/rightManage/RightList/data';

export async function getUsers(): Promise<TableListItem[]> {
  return await axios.get('/api/users');
}

export async function getUsersInfo(): Promise<TableListItem[]> {
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

export async function getRoles(): Promise<Role[]> {
  return await axios.get('/api/roles');
}

export async function getRegions() {
  return await axios.get('/api/regions');
}

export async function addUser(user: object) {
  return await axios.post('/api/users', JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

export async function getRoleList(): Promise<IFRight[]> {
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
