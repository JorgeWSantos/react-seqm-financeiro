import type { MenuType } from '@abqm-ds/react';
import type { ApiResponse } from '@src/services/types.api';

export interface MenuResponseObj {
  list_menu: MenuType;
  link_login: string;
}

export type MenuResponse = ApiResponse<MenuResponseObj>;
