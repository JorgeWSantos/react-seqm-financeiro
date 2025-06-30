import { apiCalendario } from './api.ts';
import { Toast } from '@abqm-ds/react';
import type { CalendarResponse, MenuResponse, Calendar } from '@src/pages/Main/types.ts';
import { useCallback } from 'react';

export function useResultadosApi() {
  const getResultados = useCallback(
    async ({
      nid_prova,
      uf,
    }: {
      nid_prova: string | null;
      uf: string | null;
    }): Promise<Calendar[]> => {
      try {
        const response = await apiCalendario.get<CalendarResponse>(
          '/v1/PortalCalendarioAgrupamento',
          {
            params: {
              ...(!!nid_prova && { nid_prova: Number(nid_prova) }),
              ...(!!uf && { uf }),
            },
          }
        );
        return response.data.data?.list_portal_calendario_agrupamento || [];
      } catch (error) {
        Toast.show({
          message: 'Ocorreu um erro ao carregar o calendário!',
          type: 'error',
          timeout: 3000,
        });
        console.warn(error);
        return [];
      }
    },
    []
  );

  const getMenu = useCallback(async () => {
    const response = await apiCalendario.get<MenuResponse>('/v1/Menu');
    return response.data.data || { link_login: '', list_menu: [] };
  }, []);

  return {
    getResultados,
    getMenu,
  };
}
