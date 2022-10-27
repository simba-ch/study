export type TableListItem = {
  id: number;
  username: string;
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

export type role = {
  id: number;
  roleName: string;
  roleType: number;
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

export interface IFJurisdiction {
  id: number;
  title: string;
  rightId: number;
  key: string;
  grade: number;
  routepermisson?: number;
  pagepermisson?: number;
}

export interface IFRight extends IFJurisdiction {
  children: jurisdiction[] | undefined;
}
