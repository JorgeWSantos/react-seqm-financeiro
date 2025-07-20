import { breakpointsPx } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const DivContainerTableRight = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (max-width: ${breakpointsPx.lg}) {
    overflow-x: scroll;
    margin-top: 0;

    table {
      min-width: 32rem;
    }
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
`;
