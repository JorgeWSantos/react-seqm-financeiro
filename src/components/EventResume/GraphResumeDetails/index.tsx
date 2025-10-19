import { Text } from '@abqm-ds/react';
import {
  BottomEventResume,
  CustomTooltipContainer,
  GraphResumeContainer,
} from './styles';
import { colors, fontSizes } from '@abqm-ds/tokens';
import type { EventResumeResponseData } from '@services/EventResume/types.api';

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
  Label,
  ReferenceLine,
} from 'recharts';

// Tooltip customizado para exibir o valor de pv
const CustomTooltip = ({ active, payload, label }: any) => {
  const barColors = ['#198cac', '#3fad6d', '#FBC02D', '	#FB8C00', '#e05250'];

  if (active && payload && payload.length) {
    let idx = 0;
    if (payload[0] && payload[0].payload && payload[0].payload.name) {
      idx = payload[0].payload.idx ?? 0;
    }
    return (
      <CustomTooltipContainer>
        <Text fontSize="xs" color={colors.white85}>
          <strong>Modalidades com mais inscrições</strong>
        </Text>
        <Text fontSize="xs" color={colors.white85}>
          <strong>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                backgroundColor: barColors[idx % barColors.length],
                marginRight: 8,
                border: `1px solid #b3b2b2`,
              }}
            />
            {label}:{' '}
          </strong>{' '}
          {payload[0].value}
        </Text>
      </CustomTooltipContainer>
    );
  }
  return null;
};

// Espera receber os dados completos do resumo do evento
const GraphResumeDetails = ({
  data,
  isTabletOrMobile,
}: {
  data: EventResumeResponseData;
  isTabletOrMobile: boolean;
}) => {
  const barColors = ['#198cac', '#3fad6d', '#FBC02D', '	#FB8C00', '#e05250'];

  // Faz join entre numeros_evento e provas para pegar nome e inscrições
  const provas = data?.provas || [];
  const numeros = data?.numeros_evento || [];

  // Monta array com nome da modalidade e inscrições
  const joined = provas
    .map((p) => {
      const n = numeros.find((num) => num.prova === String(p.nid_prova));
      return n
        ? {
            name: p.cds_tipo_prova,
            inscricoes: Number(n.inscricoes || 0),
          }
        : null;
    })
    .filter(Boolean);

  // Ordena pelas maiores inscrições e pega as 5 maiores
  // Adiciona o idx para cada item para facilitar o uso no tooltip
  const chartData = joined
    .sort((a, b) => b!.inscricoes - a!.inscricoes)
    .slice(0, 5)
    .map((item, idx) => ({ ...item, idx })) as {
    name: string;
    inscricoes: number;
    idx: number;
  }[];

  return (
    <GraphResumeContainer>
      <BottomEventResume>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#a9a9b280" vertical={false} />
            <XAxis
              type="number"
              dataKey="idx"
              domain={[-0.5, chartData.length - 0.5]} // centraliza as barras
              tick={false}
            >
              <Label
                value="Modalidades com mais inscrições"
                offset={8}
                position="insideBottom"
                style={{ fill: colors.emeraldGreen75, fontSize: 12 }}
              />
            </XAxis>
            <ReferenceLine
              x={(chartData.length - 1) / 2} // meio exato
              stroke="#A9A9B280"
              strokeWidth={0.5}
            />

            <YAxis
              tick={{
                fill: colors.emeraldGreen75,
                fontSize: isTabletOrMobile ? '5pt' : fontSizes.x,
              }}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Legend
              align="right"
              verticalAlign="top"
              layout="vertical"
              iconType="square"
              content={() => (
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                  {chartData.map((entry, idx) => (
                    <div
                      key={entry.name}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: 14,
                          height: 10,
                          backgroundColor: barColors[idx % barColors.length],
                          marginRight: 8,
                          border: `0.5px solid #A9A9B280`,
                        }}
                      />
                      <span
                        style={{
                          color: colors.emeraldGreen75,
                          fontSize: isTabletOrMobile ? '8pt' : '8pt',
                        }}
                      >
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />

            <Bar
              dataKey="inscricoes"
              barSize={60}
              isAnimationActive={false}
              activeBar={false}
            >
              {chartData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </BottomEventResume>
    </GraphResumeContainer>
  );
};

export default GraphResumeDetails;
