export type TableListItem = {
  id: number;
  username: string;
  password:string;
  roleState: boolean;
  default: boolean;
  region: string;
  roleId: number;
  role?: role;
  // key: number;
  // disabled?: boolean;
  // href: string;
  // avatar: string;
  // name: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: string;
  // updatedAt: Date;
  // createdAt: Date;
  // progress: number;
};

export type Role = {
  id: 1 | 2 | 3;
  roleName: '超级管理员' | '区域管理员' | '区域编辑';
  roleType: 1 | 2 | 3;
  rights: string[];
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
