import { Text } from '@abqm-ds/react';
import {
  BottomEventSummary,
  GraphSummaryContainer,
  TopEventSummary,
  TopLeftEventSummary,
  TopRightEventSummary,
} from './styles';
import { colors, fontSizes } from '@abqm-ds/tokens';
import { BarChartLineIcon } from '@abqm-ds/icons';
import type { GraphStatistics } from '../types.api';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const GraphSummaryDetails = ({ data }: { data: GraphStatistics[] }) => {
  console.log('GraphSummaryDetails data:', data);

  const chart = [
    {
      name: '2019',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2020',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2021',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2022',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2023',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2024',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2025',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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

      <BottomEventSummary>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={400}
            height={300}
            data={chart}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke={colors.emeraldGreen30} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: colors.white85, fontSize: fontSizes.x }}
              axisLine={{ stroke: colors.emeraldGreen30 }}
              tickLine={{ stroke: colors.emeraldGreen30 }}
            />
            <YAxis
              tick={{ fill: colors.white85, fontSize: fontSizes.x }}
              axisLine={{ stroke: colors.emeraldGreen30 }}
              tickLine={{ stroke: colors.emeraldGreen30 }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stroke={colors.white50}
              fill={colors.white25}
              dot={{
                r: 2,
                stroke: colors.white50,
                fill: colors.white50,
                strokeWidth: 1,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </BottomEventSummary>
    </GraphSummaryContainer>
  );
};

export default GraphSummaryDetails;
