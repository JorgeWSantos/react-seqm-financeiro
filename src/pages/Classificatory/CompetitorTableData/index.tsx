import { Text } from '@abqm-ds/react';
import { CompetitorTableDataContainer } from './styles';
import { colors } from '@abqm-ds/tokens';

const CompetitorTableData = ({ value }: { value: string }) => (
  <CompetitorTableDataContainer>
    <Text fontSize="xxs" fontWeight="semiBold" color={colors.emeraldGreen75}>
      {value}
    </Text>
  </CompetitorTableDataContainer>
);
export { CompetitorTableData };
