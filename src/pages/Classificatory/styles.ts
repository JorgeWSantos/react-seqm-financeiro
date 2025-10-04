import { colors, fonts } from '@abqm-ds/tokens';
import styled from 'styled-components';

import { Text } from '@abqm-ds/react';

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

export const ContentTabs = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  width: 100%;
  padding-left: 1rem;
  justify-content: space-between;
`;

export const ContentSwitchTabs = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
padding-bottom: 0.125rem;
`

export const TitleAndCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const StyledTextModality = styled(Text)`
  letter-spacing: -0.6px;
  text-transform: uppercase;
`;

export const StyledTextEvent = styled(Text)`
  letter-spacing: -2px;
  text-transform: uppercase;
  font-family: ${fonts.secondary};
`;

// -------------------------

export const StyledDivClassD = styled.div`
  display: flex;
`;

export const StyledTdTextClassD = styled.span`
  font-size: 0.6rem;
`;

export const StyledTdSpanClassD = styled.span`
  font-size: 0.5rem;
  margin-bottom: -4px !important;
  align-self: flex-end;
`;

export const DivCompetitor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`
