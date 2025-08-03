import { Text } from '@abqm-ds/react';
import { breakpointsPx, fontSizes } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const CompetitorTableDataContainer = styled.div`
  display: flex;
  align-items: center;
  height: 1.25rem;

  @media (max-width: ${breakpointsPx.lg}) {
    height: 2rem;
  }
`;

export const StyledTextCompetitor = styled(Text).attrs({
  fontSize: 'xxs',
  fontWeight: 'semiBold',
})`
  display: flex;

  /* white-space: nowrap; */

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.ssm};
  }
`;
