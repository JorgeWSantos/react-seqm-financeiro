import { Text } from '@abqm-ds/react';
import { colors, fontSizes, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
`;

export const ButtonNotPointed = styled.button`
  display: flex;
  flex-direction: column;
  background-color: ${colors.emeraldGreen25};
  padding: 0.5625rem ${space[8]};

  border: ${radii.px} solid ${colors.white25};
  border-radius: ${radii.sm};
  gap: ${space[2]};

  max-width: 171px;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    filter: brightness(120%);
  }

  @media (max-width: 992px) {
    padding: ${space[2]} ${space[6]};
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

  @media (max-width: 992px) {
    font-size: ${fontSizes.xxs};
    text-align: center;
  }
`;
