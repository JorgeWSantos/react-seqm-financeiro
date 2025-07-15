import { colors, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const GraphSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.emeraldGreen25};
  border-radius: 0.375rem;
  overflow: hidden; // garante que filhos respeitem o border-radius
`;

export const TopEventSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 2rem;
  gap: ${space[2]};
  padding: 0.375rem ${space[4]};
`;

export const TopLeftEventSummary = styled.div`
  display: flex;
  align-items: center;

  gap: ${space[2]};
`;

export const TopRightEventSummary = styled.div`
  display: flex;
  align-items: center;

  gap: ${space[2]};
`;

export const BottomEventSummary = styled.div`
  display: flex;
  padding: 1.5rem;

  width: 100%;
  height: 280px;
  gap: 1px;
  box-sizing: border-box;

  background-color: ${colors.black30};
`;
