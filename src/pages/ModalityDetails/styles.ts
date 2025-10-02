import { colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerMain = styled.div`
  height: 100%;
`;

export const LinkToRedirect = styled.span`
  cursor: pointer;
  text-decoration: none;
`

export const RemoveScrollableMobile = styled.div`
  overflow-x: unset;
  overflow-y: unset;
`;

export const DivTopMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.white25};
  margin: 0 0.5rem;
  padding-bottom: 0.375rem;
`;

export const DivInfoCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.125rem;
`;
