import { Text } from '@abqm-ds/react';
import { colors, fontWeights, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const EventSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.emeraldGreen25};
  border-radius: 0.375rem;
  overflow: hidden; // garante que filhos respeitem o border-radius
`;

export const TopEventSummary = styled.div`
  display: flex;
  padding: ${space[1]} ${space[2]};
  align-items: flex-start;
  align-self: stretch;
`;

export const StyledTextTopEventSummary = styled(Text).attrs({
  fontSize: 'ssm',
  color: colors.white85,
  fontWeight: 'regular',
})`
  line-height: 1rem;
`;

export const BottomEventSummary = styled.div`
  display: grid;
  grid-template-columns: 21% 21% 21% 1fr;

  width: 100%;
  gap: 1px;
  box-sizing: border-box;
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  background-color: ${colors.black30};
`;

export const StyledTitleCard = styled(Text).attrs({
  fontWeight: 'semiBold',
})`
  color: ${colors.white75};
  font-size: 0.5625rem;
  font-weight: ${fontWeights.regular};
  line-height: 0.75rem;
`;

export const StyledSubTitleCard = styled(Text).attrs({
  fontSize: 'ssm',
  fontWeight: 'semiBold',
})`
  color: ${colors.white75};
  line-height: 1rem;
`;
