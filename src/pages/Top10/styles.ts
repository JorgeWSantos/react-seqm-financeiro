import { colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerMain = styled.div`
  height: 100%;
  position: relative;
`;

export const ContainerMobileMain = styled.div`
  height: 100%;
`;

export const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
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

export const EventHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
