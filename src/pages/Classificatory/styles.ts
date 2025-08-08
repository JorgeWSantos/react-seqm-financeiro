import { colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerMain = styled.div`
  height: 100%;
`;

export const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
`;

export const DivTopMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.white25};
  padding-bottom: 0.375rem;
`;

export const DivInfoCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.125rem;
`;

export const TabAndCards = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 0.5rem;

  .empty {
    display: flex;
    margin-top: 1rem;
  }
`;
