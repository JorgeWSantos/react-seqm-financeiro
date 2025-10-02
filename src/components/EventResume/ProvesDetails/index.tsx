import {
  BottomEventSummary,
  EventSummaryContainer,
  StyledCard,
  StyledSubTitleCard,
  StyledTextTopEventSummary,
  StyledTitleCard,
  TopEventSummary,
} from './styles';

import type { NumberEvents } from '../../../services/EventSummary/types.api';

interface CardSummaryProps {
  title?: string;
  subTitle?: string;
}

interface ProvesDetailsProps extends NumberEvents {
  name_prove: string;
}

const CardSummary = ({ title, subTitle }: CardSummaryProps) => {
  return (
    <StyledCard>
      <StyledTitleCard>{title}</StyledTitleCard>
      <StyledSubTitleCard>{subTitle}</StyledSubTitleCard>
    </StyledCard>
  );
};

const ProvesDetails = ({ data }: { data: ProvesDetailsProps }) => {
  return (
    <EventSummaryContainer>
      <TopEventSummary>
        <StyledTextTopEventSummary>{data.name_prove}</StyledTextTopEventSummary>
      </TopEventSummary>

      <BottomEventSummary>
        <CardSummary subTitle={data.inscricoes} title={'inscrições'} />
        <CardSummary subTitle={data.competidores} title={'competidores'} />
        <CardSummary subTitle={data.animais} title={'animais'} />
        <CardSummary
          subTitle={
            data.premiacao !== 'sem premiação' ? 'R$ ' + data.premiacao : 'sem premiação'
          }
          title={data.premiacao !== 'sem premiação' ? 'em premiação' : ''}
        />
      </BottomEventSummary>
    </EventSummaryContainer>
  );
};

export default ProvesDetails;
