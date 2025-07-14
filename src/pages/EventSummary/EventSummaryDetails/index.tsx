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

const EventSummaryDetails = () => {
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
          <Text fontSize="ssm" lineHeight="tight" color={colors.white75}>
            2023
          </Text>
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
