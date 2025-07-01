import { apiResultados } from './api.ts';
import { Toast } from '@abqm-ds/react';
import type { MenuResponse } from '@src/types.ts';
import { useCallback } from 'react';

export function useMenuService() {
  const getMenu = useCallback(async () => {
    try {
      const response = await apiResultados.get<MenuResponse>('/v1/Menu');
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

  return {
    getMenu,
  };
}
