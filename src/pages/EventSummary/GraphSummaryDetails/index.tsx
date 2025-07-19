import { Text } from '@abqm-ds/react';
import {
  BottomEventSummary,
  CustomTooltipContainer,
  GraphSummaryContainer,
  TopEventSummary,
  TopLeftEventSummary,
  TopRightEventSummary,
  TopRightOptions,
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
import { useEffect, useState } from 'react';
// Tooltip customizado para exibir o valor de pv
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <Text fontSize="xs" color={colors.white85}>
          <strong>Ano:</strong> {label}
        </Text>
        <Text fontSize="xs" color={colors.white85}>
          <strong>Inscrições:</strong> {payload[0].value}
        </Text>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const GraphSummaryDetails = ({ data }: { data: GraphStatistics[] }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isOficial, setIsOficial] = useState<'local' | 'nacional'>('local'); // Assuming 'local' is the default value for isOficial
  const maxInscricoesRaw = data?.reduce((max, item) => Math.max(max, item.inscricoes), 0);

  // Função para arredondar para cima para o múltiplo de 1000 mais próximo
  function roundUpToThousand(num: number) {
    return Math.ceil(num / 1000) * 1000;
  }

  const maxInscricoes = roundUpToThousand(maxInscricoesRaw || 0);

  // Gera os ticks correspondentes a 10%, 20%, ..., 100% do valor máximo de inscrições
  const ticks = [];
  for (let percent = 10; percent <= 100; percent += 10) {
    const tickValue = Math.round((maxInscricoes * percent) / 100);
    ticks.push(tickValue);
  }

  useEffect(() => {
    const dataToShow: any[] = [];

    data?.filter((item) => {
      if (item.ccd_tipo === isOficial) {
        dataToShow.push({
          name: item.ano,
          pv: item.inscricoes,
        });
      }
    });

    console.log('GraphSummaryDetails dataToShow:', dataToShow);
    setChartData(dataToShow);
  }, [data, isOficial]);

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
          <TopRightOptions
            $isSelected={isOficial === 'local'}
            onClick={() => setIsOficial('local')}
          >
            <Text
              fontSize="xs"
              lineHeight="short"
              color={isOficial === 'local' ? colors.white85 : colors.white50}
            >
              Oficiais
            </Text>
          </TopRightOptions>
          <TopRightOptions
            $isSelected={isOficial === 'nacional'}
            onClick={() => setIsOficial('nacional')}
          >
            <Text
              fontSize="xs"
              lineHeight="short"
              color={isOficial === 'nacional' ? colors.white85 : colors.white50}
            >
              Oficializadas
            </Text>
          </TopRightOptions>
        </TopRightEventSummary>
      </TopEventSummary>

      <BottomEventSummary>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            width={500}
            height={240}
            data={chartData}
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
              domain={[500, maxInscricoes]}
              ticks={[...ticks]}
              interval={0}
              tick={{ fill: colors.white85, fontSize: fontSizes.x }}
              axisLine={{ stroke: colors.emeraldGreen30 }}
              tickLine={{ stroke: colors.emeraldGreen30 }}
            />
            <Tooltip content={<CustomTooltip />} />
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
