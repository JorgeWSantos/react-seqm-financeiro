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

const CardSummary = () => {
  return (
    <StyledCard>
      <Text
        fontSize="ssm"
        fontWeight="semiBold"
        lineHeight="tight"
        color={colors.white85}
      >
        259
      </Text>
      <Text fontSize="xxs" lineHeight="shorter" color={colors.white75}>
        inscrições
      </Text>
    </StyledCard>
  );
};

// Componente Switch simples
const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
      onClick={onChange}
      style={{
        width: '2rem',
        height: 16,
        borderRadius: 12,
        background: colors.white25,
        border: 'none',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s',
        padding: 0,
      }}
      aria-checked={checked}
      role="switch"
    >
      <span
        style={{
          display: 'block',
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: '50%',
          background: colors.white,
          position: 'absolute',
          top: -2,
          left: checked ? 14 : 0,
          transition: 'left 0.3s',
        }}
      />
    </button>
  </div>
);

const EventSummaryDetails = () => {
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <EventSummaryContainer>
      <TopEventSummary>
        <TopLeftEventSummary>
          <FileEarmarkCheckIcon fill={colors.white75} />
          <Text fontSize="ssm" lineHeight="tight" color={colors.white75}>
            Números da modalidade neste evento
          </Text>
        </TopLeftEventSummary>
        <TopRightEventSummary>
          <Switch
            checked={switchChecked}
            onChange={() => setSwitchChecked((prev) => !prev)}
          />
        </TopRightEventSummary>
      </TopEventSummary>

      <BottomEventSummary>
        <CardSummary />
        <CardSummary />
        <CardSummary />
        <CardSummary />
      </BottomEventSummary>
    </EventSummaryContainer>
  );
};

export default EventSummaryDetails;
