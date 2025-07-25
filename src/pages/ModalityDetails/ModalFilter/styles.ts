// ============
// Modal

import { Text } from '@abqm-ds/react';
import { breakpointsPx, colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ModalContent = styled.div`
  width: 19rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  height: 100%;

  @media (max-width: ${breakpointsPx.sm}) {
    width: 300px;
  }
`;

export const DivGroup = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export const TextGroup = styled(Text).attrs({
  fontSize: 'smm',
  fontWeight: 'semiBold',
  color: colors.green900,
  lineHeight: 'tight',
})`
  text-align: center;
`;

export const DivButton = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
