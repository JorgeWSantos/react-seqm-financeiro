import React from 'react';
import { TableSEQM, ActivityIndicator, Text } from '@abqm-ds/react';
import type { TableColumnSEQM, TableRowSEQM } from '@abqm-ds/react';
import { colors } from '@abqm-ds/tokens';
import { DivContainerTableRight, LoadingContainer, NotFoundContainer } from './styles';

interface EventTableProps {
  data: TableRowSEQM[];
  columns: TableColumnSEQM[];
  isLoading: boolean;
}

const EventTable: React.FC<EventTableProps> = ({ data, columns, isLoading }) => {
  return (
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
};
export default EventTable;
