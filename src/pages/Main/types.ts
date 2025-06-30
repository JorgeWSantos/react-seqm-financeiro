import type { MenuType } from '@abqm-ds/react';
import type { ApiResponse } from '@src/services/types.api';

//Calendar
export interface Calendar {
  nid_agrupa_evento: number;
  tipo_agrupamento: string;
  cds_agrupa_evento: string;
  cds_local_evento: string;
  ddt_inicio_evento: string;
  dt_fim_evento: string;
  ddt_inicio_insc_evento: string;
  ddt_fim_insc_evento: string;
  cds_nome_arquivo_banner: string;
  cds_nome_arquivo_logo_tipo: string;
  cds_nome_arquivo_circular: string;
  cnm_estado: string;
  cnm_cidade: string;
  bid_oficial: boolean;
  ddt_hora_fim_inscricao_nucleo: string;
  ddt_hora_insc_evento: string | null;
}

interface CalendarResponseObj {
  list_portal_calendario_agrupamento: Calendar[];
}

export type CalendarResponse = ApiResponse<CalendarResponseObj>;

//Proves

export type Prove = {
  nid_prova: string | number;
  cds_tipo_prova: string;
  qtde_provas: number;
  qtde_participantes: number;
};

interface ProvesResponseObj {
  list_resultados_qtde_por_modalidade: Prove[];
}

export type ProvesResponse = ApiResponse<ProvesResponseObj>;

export interface MenuResponseObj {
  list_menu: MenuType;
  link_login: string;
}

export type MenuResponse = ApiResponse<MenuResponseObj>;
