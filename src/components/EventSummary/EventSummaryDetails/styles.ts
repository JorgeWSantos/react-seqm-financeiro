import { Text } from '@abqm-ds/react';
import { breakpointsPx, colors, fontSizes, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const EventSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 4.7625rem;
  background-color: ${colors.emeraldGreen25};
  border-radius: 0.375rem;
  overflow: hidden; // garante que filhos respeitem o border-radius

  @media (max-width: ${breakpointsPx.lg}) {
    min-height: 5.875rem;
  }
`;

export const TopEventSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  min-height: 2rem;
  gap: ${space[2]};
  padding: 0.375rem ${space[4]};

  @media (max-width: ${breakpointsPx.lg}) {
    gap: ${space[6]};
  }
`;

export const TopLeftEventSummary = styled.div`
  display: flex;
  align-items: center;

  gap: ${space[2]};

  @media (max-width: ${breakpointsPx.lg}) {
    max-width: 56%;
  }
`;

export const TopRightEventSummary = styled.div`
  display: flex;
  align-items: center;

  gap: ${space[2]};
`;

export const StyledTextTopRightES = styled(Text).attrs({
  fontSize: 'xs',
  lineHeight: 'short',
  color: colors.white75,
})`
  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.xxs};
  }
`;

export const BottomEventSummary = styled.div`
  display: grid;
  grid-template-columns: 21% 21% 21% 1fr;

  width: 100%;
  min-height: 2.763rem;
  gap: 1px;
  box-sizing: border-box;
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.black30};
`;
