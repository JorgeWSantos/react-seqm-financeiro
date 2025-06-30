import { Text } from '@abqm-ds/react';
import { colors, space } from '@abqm-ds/tokens';
import styled, { css } from 'styled-components';

export type VariantsRoundedButtonModalitie = 'default' | 'secondary';

interface DivModalitieProps {
  $variant: VariantsRoundedButtonModalitie;
}

export const DivModalitie = styled.div<DivModalitieProps>`
  display: flex;
  padding: ${space[1]} ${space[1]} 0rem ${space[1]};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 6.5rem;

  text-align: center;

  cursor: pointer;

  & img,
  & span,
  & p {
    transition: filter 0.5s, text-shadow 0.3s, color 0.3s;
  }

  &:hover img,
  &:hover span,
  &:hover p {
    filter: brightness(130%);
    text-shadow: 0 0 1px ${colors.emeraldGreen25}, 0 0 1px ${colors.emeraldGreen25};
    color: ${colors.emeraldGreen75};
  }

  &:hover {
    .rounded-button {
      box-shadow: 0 0 0 6px ${colors.white25};
    }

    ${({ $variant }) =>
      $variant === 'secondary' &&
      css`
        .rounded-button {
          box-shadow: 0 0 0 4px ${colors.white25};
        }
      `}
  }
`;

interface RoundedButtonProps {
  $variant: VariantsRoundedButtonModalitie;
}

export const RoundedButton = styled.button<RoundedButtonProps>`
  display: flex;
  width: 6.25rem;
  height: 6.25rem;
  max-width: 104px;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 0 4px ${colors.white25};

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      box-shadow: 0 0 0 0 ${colors.white25};
    `}

  border-radius: 50%;
  gap: 0.5rem;
  aspect-ratio: 1/1;

  cursor: pointer;
  transition: box-shadow 0.3s ease, width 0.3s, height 0.3s;
`;

interface ImageModalitieProps {
  $variant: VariantsRoundedButtonModalitie;
}

export const ImageModalitie = styled.img<ImageModalitieProps>`
  width: 100%;
  height: 100%;

  background-color: ${colors.green500};

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: ${colors.black50};
    `}

  padding: 0.5rem;

  border-radius: 50%;
  gap: 0.5rem;
  aspect-ratio: 1/1;
`;

export const StyledText = styled(Text).attrs({
  fontSize: 'ssm',
  fontWeight: 'regular',
  lineHeight: 'tight',
})`
  color: ${colors.emeraldGreen75};
`;
