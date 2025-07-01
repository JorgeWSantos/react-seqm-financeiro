import { Text } from '@abqm-ds/react';
import { breakpointsPx, colors, fontWeights, lineHeights, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const DivModality = styled.div`
  display: flex;
  padding: ${space[1]} ${space[1]} 0rem ${space[1]};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 6.5rem;

  text-align: center;

  cursor: pointer;

  & img,
  & span,
  & p {
    transition: filter 0.5s, text-shadow 0.3s, color 0.3s;
  }

  &:hover img,
  &:hover span,
  &:hover p {
    filter: brightness(130%);
    text-shadow: 0 0 1px ${colors.emeraldGreen25}, 0 0 1px ${colors.emeraldGreen25};
    color: ${colors.emeraldGreen75};
  }

  @media (max-width: ${breakpointsPx.lg}) {
    max-width: 6.125rem;
  }
`;

export const StyledText = styled(Text).attrs({
  fontSize: 'ssm',
  fontWeight: 'regular',
  lineHeight: 'tight',
})`
  color: ${colors.emeraldGreen75};

  @media (max-width: ${breakpointsPx.lg}) {
    font-weight: ${fontWeights.semiBold};
    line-height: ${lineHeights.short};
  }
`;
