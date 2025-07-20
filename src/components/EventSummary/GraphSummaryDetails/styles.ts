import { breakpointsPx, colors, radii, space } from '@abqm-ds/tokens';
import styled, { css } from 'styled-components';

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
  padding: 0 ${space[4]};

  @media (max-width: ${breakpointsPx.lg}) {
    min-height: 2.5rem;
  }
`;

export const TopLeftEventSummary = styled.div`
  display: flex;
  align-items: center;

  gap: ${space[2]};
`;

export const TopRightEventSummary = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: ${space[2]};
`;

export const TopRightOptions = styled.div<{
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  height: 100%;

  position: relative;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-bottom: ${radii.px} solid ${colors.white85};
      border-top: ${radii.px} solid transparent;

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 4px solid transparent;
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 4px solid ${colors.white85};
      }
    `}
`;
export const BottomEventSummary = styled.div`
  display: flex;
  /* padding: 0.5rem; */
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 280px;
  gap: 1px;
  box-sizing: border-box;

  background-color: ${colors.black30};

  @media (max-width: ${breakpointsPx.lg}) {
    height: 220px;
  }
`;

export const CustomTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.emeraldGreen40};
  padding: 8px;
  border-radius: 4px;
  gap: 4px;
`;
