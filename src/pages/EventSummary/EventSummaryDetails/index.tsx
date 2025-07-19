import { useState } from 'react';
import { Switch, Text } from '@abqm-ds/react';
import {
  BottomEventSummary,
  EventSummaryContainer,
  StyledCard,
  TopEventSummary,
  TopLeftEventSummary,
  TopRightEventSummary,
} from './styles';
import { colors } from '@abqm-ds/tokens';
import { FileEarmarkCheckIcon } from '@abqm-ds/icons';
import type { NumberEvents } from '../types.api';

interface CardSummaryProps {
  title?: string;
  subTitle?: string;
}

const CardSummary = ({ title, subTitle }: CardSummaryProps) => {
  return (
    <StyledCard>
      <Text
        fontSize="ssm"
        fontWeight="semiBold"
        lineHeight="tight"
        color={colors.white85}
      >
        {title}
      </Text>
      <Text fontSize="xxs" lineHeight="shorter" color={colors.white75}>
        {subTitle}
      </Text>
    </StyledCard>
  );
};

const EventSummaryDetails = ({ data }: { data: Array<NumberEvents> | null }) => {
  const [switchChecked, setSwitchChecked] = useState(false);

  const resumeData = data?.[0] || {
    inscricoes: '0',
    competidores: '0',
    animais: '0',
    premiacao: 'sem premiação',
  };

  const generalResume = data?.[1] || {
    inscricoes: '0',
    competidores: '0',
    animais: '0',
    premiacao: 'sem premiação',
  };

  return (
    <EventSummaryContainer>
      <TopEventSummary>
        <TopLeftEventSummary>
          <FileEarmarkCheckIcon fill={colors.white75} />
          <Text fontSize="ssm" lineHeight="tight" color={colors.white85}>
            Números da modalidade neste evento
          </Text>
        </TopLeftEventSummary>
        <TopRightEventSummary>
          <Switch
            checked={switchChecked}
            onChange={() => setSwitchChecked((prev) => !prev)}
          />
          <Text fontSize="xs" lineHeight="short" color={colors.white75}>
            Resumo geral
          </Text>
        </TopRightEventSummary>
      </TopEventSummary>

      <BottomEventSummary>
        <CardSummary
          title={switchChecked ? generalResume.inscricoes : resumeData.inscricoes}
          subTitle={'inscrições'}
        />
        <CardSummary
          title={switchChecked ? generalResume.competidores : resumeData.competidores}
          subTitle={'competidores'}
        />
        <CardSummary
          title={switchChecked ? generalResume.animais : resumeData.animais}
          subTitle={'animais'}
        />
        <CardSummary
          title={
            (switchChecked ? generalResume.premiacao : resumeData.premiacao) ??
            'sem premiação'
          }
          subTitle={
            (switchChecked ? generalResume.premiacao : resumeData.premiacao)
              ? 'em premiação'
              : ''
          }
        />
      </BottomEventSummary>
    </EventSummaryContainer>
  );
};

export default EventSummaryDetails;
