import { api } from './api.ts';
import { Toast, type LoggedUser, type MenuType } from '@abqm-ds/react';
import { useCallback } from 'react';
import type { ApiResponse } from './types.api.ts';

export interface MenuResponseObj {
  list_menu: MenuType;
  link_login: string;
}

export type MenuResponse = ApiResponse<MenuResponseObj>;

export type PersonDataResponse = ApiResponse<{
  dados_pessoa: LoggedUser;
}>;

export function useGeneralService() {
  const getMenu = useCallback(async () => {
    try {
      const response = await api.get<MenuResponse>('/v1/Menu');

      return response.data.data || { link_login: '', list_menu: [] };
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um erro ao carregar o menu!',
        type: 'error',
        timeout: 3000,
      });
      console.warn(error);
      return { link_login: '', list_menu: [] };
    }
  }, []);

  const getPersonData = useCallback<() => Promise<PersonDataResponse>>(async () => {
    try {
      const response = await api.get<PersonDataResponse>(
        '/v1/PessoaSelectPorTokenExpiration'
      );

      return response.data;
    } catch (error) {
      Toast.show({
        message: 'Ops, ocorreu um erro ao carregar os dados da pessoa!',
        type: 'error',
        timeout: 3000,
      });

      console.warn(error);
      return {
        success: false,
        message: 'Erro ao carregar os dados da pessoa',
        trace_id: '',
        data: { dados_pessoa: {} as LoggedUser },
      };
    }
  }, []);

  return {
    getMenu,
    getPersonData,
  };
}
