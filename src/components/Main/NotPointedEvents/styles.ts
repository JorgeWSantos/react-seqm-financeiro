import { Text } from '@abqm-ds/react';
import { colors, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0rem;
`;

export const ButtonNotPointed = styled.button`
  display: flex;
  flex-direction: column;
  background-color: ${colors.emeraldGreen25};
  padding: 0.5625rem 2rem;

  border: ${radii.px} solid ${colors.white25};
  border-radius: 0.375rem;
  gap: ${space[2]};

  max-width: 171px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    filter: brightness(120%);
  }
`;

export const TextNotPointed = styled(Text).attrs({
  fontSize: 'ssm',
  lineHeight: 'tight',
  fontWeight: 'regular',
})`
  color: ${colors.white85};
  display: flex;
  flex-direction: column;
`;
