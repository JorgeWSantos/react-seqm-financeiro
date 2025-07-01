import { breakpointsPx, colors } from '@abqm-ds/tokens';
import styled, { css } from 'styled-components';

export type VariantsRoundedModalityButton = 'default' | 'secondary';

interface RoundedButtonProps {
  $variant: VariantsRoundedModalityButton;
}

export const RoundedButton = styled.button<RoundedButtonProps>`
  display: flex;
  /* width: 6rem;
  height: 6rem;
  max-width: 6rem; */
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 0 4px ${colors.white25};

  background-color: ${colors.green500};

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: ${colors.black50};
    `}

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

  &:hover {
    box-shadow: 0 0 0 6px ${colors.white25};

    ${({ $variant }) =>
      $variant === 'secondary' &&
      css`
        box-shadow: 0 0 0 4px ${colors.white25};
      `}
  }

  @media (max-width: ${breakpointsPx.lg}) {
    width: 5.625rem;
    height: 5.625rem;
    max-width: 5.625rem;
  }
`;

interface ImageModalitieProps {
  $variant: VariantsRoundedModalityButton;
}

export const ImageModalitie = styled.img<ImageModalitieProps>`
  width: 100%;
  height: 100%;

  padding: 0.5rem;

  border-radius: 50%;
  gap: 0.5rem;
  aspect-ratio: 1/1;
`;
