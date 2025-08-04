import { colors, space, radii } from '@abqm-ds/tokens'

import styled from 'styled-components'


export const Container = styled.div<{ $reverse?: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: ${space[1]} ${space[5]};
  min-width: 5rem;
  height: 2.375rem;
  background: ${colors.emeraldGreen25};
  border-radius: ${radii.xs};
  flex: none;
  order: 0;
  flex-grow: 0;

`
/* 
  ${({ $reverse }) =>
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
  }
` */

