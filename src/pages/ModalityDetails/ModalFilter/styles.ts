// ============
// Modal

import { Button, Heading, Text } from '@abqm-ds/react';
import { breakpointsPx, colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ModalContent = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;

  @media (max-width: ${breakpointsPx.sm}) {
    width: 300px;
  }
`;

export const TitleModal = styled(Heading).attrs({
  color: colors.black85,
  fontWeight: 'semiBold',
  fontSize: 'md',
})`
  line-height: 2rem;
  text-align: center;
`;

export const TextModal = styled(Text).attrs({
  color: colors.black85,
  fontWeight: 'semiBold',
})``;

export const DivInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextInfosDatesTop = styled(Text).attrs({
  fontSize: 'smm',
  fontWeight: 'regular',
  color: colors.black75,
})`
  text-align: center;
  line-height: 1.625rem;
`;

export const TextInfosDates = styled(Text).attrs({
  fontSize: 'lgg',
  fontWeight: 'semiBold',
  color: colors.black75,
})`
  text-align: center;
  line-height: 1.625rem;
`;

export const ButtonFolder = styled(Button).attrs({})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem 1rem 0.5rem 0.75rem;
  height: 32px;

  width: 120px;
  background-color: ${colors.green300};

  color: ${colors.white85};

  svg {
    path {
      fill: ${colors.white};
    }
  }
`;
