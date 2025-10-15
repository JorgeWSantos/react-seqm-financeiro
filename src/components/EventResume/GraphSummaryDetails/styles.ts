import { breakpointsPx, colors, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const GraphSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  border-radius: 4px;
  border: 0.5px solid ${colors.white25};
  background: ${colors.white50};
`;

export const BottomEventSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  gap: 1px;
  box-sizing: border-box;
  background: transparent;
  @media (max-width: ${breakpointsPx.lg}) {
    height: 220px;
  }
`;

export const CustomTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.emeraldGreen75};
  color: ${colors.white};
  padding: ${space[2]} ${space[3]};
  border-radius: 4px;
  gap: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: 600;
  z-index: 10;
  position: relative;
`;
