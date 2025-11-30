import { Text } from '@abqm-ds/react';
import styled from 'styled-components';


export const ContainerMain = styled.div`
  height: 100%;
  position: relative;
`;

export const ContainerMobileMain = styled.div`
  height: 100%;
`;

export const RemoveScrollableMobile = styled.div`
  overflow-x: unset;
  overflow-y: unset;
`;

export const ContentTabs = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  justify-content: space-between;
  padding-bottom: 0.3125rem;
`;

export const TitleAndCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const DivCompetitor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`
export const StyledTextTable = styled(Text).attrs({
  fontSize: 'xxs',
})`
  white-space: nowrap;
`;
