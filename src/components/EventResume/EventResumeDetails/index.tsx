import { Text } from '@abqm-ds/react';
import {
  BottomEventSummary,
  EventSummaryContainer,
  StyledCard,
  StyledTextTopRightES,
  TopEventSummary,
  TopLeftEventSummary,
  TopRightEventSummary,
} from './styles';
import { colors } from '@abqm-ds/tokens';
import { FileEarmarkCheckIcon } from '@abqm-ds/icons';
import type { NumberEvents } from '../../../services/EventSummary/types.api';

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

const EventResumeDetails = ({ data }: { data: NumberEvents }) => {
  return (
    <EventSummaryContainer>
      <TopEventSummary>
        <TopLeftEventSummary>
          <FileEarmarkCheckIcon fill={colors.white75} width={14} height={14} />

          <Text fontSize="ssm" lineHeight="tight" color={colors.white85}>
            Números da modalidade neste evento
          </Text>
        </TopLeftEventSummary>

        <TopRightEventSummary>
          <StyledTextTopRightES>Resumo geral</StyledTextTopRightES>
        </TopRightEventSummary>
      </TopEventSummary>

      <BottomEventSummary>
        <CardSummary title={data.inscricoes} subTitle={'inscrições'} />
        <CardSummary title={data.competidores} subTitle={'competidores'} />
        <CardSummary title={data.animais} subTitle={'animais'} />
        <CardSummary
          title={
            data.premiacao !== 'sem premiação' ? 'R$ ' + data.premiacao : 'sem premiação'
          }
          subTitle={data.premiacao !== 'sem premiação' ? 'em premiação' : ''}
        />
      </BottomEventSummary>
    </EventSummaryContainer>
  );
};

export default EventResumeDetails;
