import React from 'react';
import { TableSEQM, ActivityIndicator, Text } from '@abqm-ds/react';
import type { TableColumnSEQM } from '@abqm-ds/react';
import type { TableEventSummaryData } from '../../../pages/EventSummary/types';
import { colors } from '@abqm-ds/tokens';
import { DivContainerTableRight, LoadingContainer, NotFoundContainer } from './styles';

interface EventTableProps {
  data: TableEventSummaryData[];
  columns: TableColumnSEQM<TableEventSummaryData>[];
  isLoading: boolean;
}

const EventTable: React.FC<EventTableProps> = ({ data, columns, isLoading }) => (
  <DivContainerTableRight>
    {data?.length > 0 ? (
      <TableSEQM data={data} columns={columns} />
    ) : (
      <>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator width={20} height={20} />
          </LoadingContainer>
        ) : (
          <NotFoundContainer>
            <Text fontSize="smm" fontWeight="semiBold" color={colors.emeraldGreen75}>
              Nenhum resultado encontrado
            </Text>
          </NotFoundContainer>
        )}
      </>
    )}
  </DivContainerTableRight>
);

export default EventTable;
