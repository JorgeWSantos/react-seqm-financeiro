import { breakpointsPx, colors, fontWeights, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const GraphResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  box-shadow: 0 0.25rem 1.5rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: ${space[8]} ${space[6]} ${space[6]} ${space[6]};
  border-radius: ${radii.xs};
  border: 0.5px solid ${colors.white25};
  background: ${colors.white50};

  @media (min-width: ${breakpointsPx.md}) and (max-width: ${breakpointsPx.lg}) {
    width: 90%;
    align-self: center;
  }

  @media (max-width: ${breakpointsPx.xl}) {
    padding: ${space[2]};
  }
`;

export const BottomEventResume = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17.5rem;
  gap: 0.063rem;
  box-sizing: border-box;
  background: transparent;
  @media (max-width: ${breakpointsPx.lg}) {
    height: 13.75rem;
  }
`;

export const CustomTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.emeraldGreen75};
  color: ${colors.white};
  padding: ${space[2]} ${space[3]};
  border-radius: ${radii.xs};
  gap: ${space[1]};
  box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: ${fontWeights.semiBold};
  z-index: 10;
  position: relative;
`;
