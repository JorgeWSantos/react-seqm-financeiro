import React, { useState } from 'react';
import { Text } from '@abqm-ds/react';
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
import Switch from './Switch';

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

const EventSummaryDetails = () => {
  const [switchChecked, setSwitchChecked] = useState(false);

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
        <CardSummary title={'2025'} subTitle={'inscrições'} />
        <CardSummary title={'86'} subTitle={'competidores'} />
        <CardSummary title={'117'} subTitle={'animais'} />
        <CardSummary title={'R$ 33.793,00'} subTitle={'em premiação'} />
      </BottomEventSummary>
    </EventSummaryContainer>
  );
};

export default EventSummaryDetails;
