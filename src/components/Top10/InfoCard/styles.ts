import { colors, radii, breakpointsPx } from '@abqm-ds/tokens';

import styled, { css } from 'styled-components';

export const Container = styled.div<{ $reverse?: boolean }>`
  display: flex;
  min-width: 80px;
  padding: 2px 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 32px;
  background: ${colors.emeraldGreen25};
  border-radius: ${radii.xs};

  /* ${({ $reverse }) =>
    $reverse
      ? css`
          span:first-child {
            margin-bottom: -0.2rem;
          }
        `
      : css`
          span + span {
            margin-top: -0.1rem;
          }
        `}

  @media (max-width: ${breakpointsPx.lg}) {
    height: 2rem;
    padding: 0.1875rem 0.5rem;

    ${({ $reverse }) =>
    $reverse
      ? css`
          span:first-child {
            margin-bottom: -0.2rem;
          }
        `
      : css`
          span:first-child {
            margin-bottom: -0.1rem;
          }
          span + span {
            margin-bottom: -0.2rem;
          }
        `}
  } */
`;
