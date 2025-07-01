import { Heading } from '@abqm-ds/react';
import { breakpointsPx, colors, fontSizes, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${space[1]};
`;

export const HeadingModalities = styled(Heading).attrs({
  // fontSize: 'ssm',
  // lineHeight: 'tight',
  // fontWeight: 'regular',
  fontSize: 'ssm',
})`
  color: ${colors.emeraldGreen75};
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.xl};
  }
`;

export const ContentModalities = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: 0.625rem;

  border: 1px solid ${colors.green500};

  @media (max-width: ${breakpointsPx.lg}) {
    padding: 0.5rem;
    gap: 1rem 0.75rem;
  }
`;
