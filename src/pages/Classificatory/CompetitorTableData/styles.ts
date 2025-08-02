import { breakpointsPx } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const CompetitorTableDataContainer = styled.div`
  display: flex;
  align-items: center;
  height: 1.25rem;

  @media (max-width: ${breakpointsPx.lg}) {
    height: 2rem;
  }
`;
