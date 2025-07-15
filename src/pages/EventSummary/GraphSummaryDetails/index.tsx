import { Text } from '@abqm-ds/react';
import {
  BottomEventSummary,
  GraphSummaryContainer,
  TopEventSummary,
  TopLeftEventSummary,
  TopRightEventSummary,
} from './styles';
import { colors } from '@abqm-ds/tokens';
import { BarChartLineIcon } from '@abqm-ds/icons';
import type { GraphStatistics } from '../types.api';

const GraphSummaryDetails = ({ data }: { data: GraphStatistics[] }) => {
  console.log('GraphSummaryDetails data:', data);
  return (
    <GraphSummaryContainer>
      <TopEventSummary>
        <TopLeftEventSummary>
          <BarChartLineIcon fill={colors.white75} />
          <Text fontSize="ssm" lineHeight="tight" color={colors.white85}>
            Estatísticas de inscrições da modalidade
          </Text>
        </TopLeftEventSummary>
        <TopRightEventSummary>
          <Text fontSize="xs" lineHeight="short" color={colors.white75}>
            Oficiais
          </Text>
          <Text fontSize="xs" lineHeight="short" color={colors.white75}>
            Oficializadas
          </Text>
        </TopRightEventSummary>
      </TopEventSummary>

      <BottomEventSummary></BottomEventSummary>
    </GraphSummaryContainer>
  );
};

export default GraphSummaryDetails;
