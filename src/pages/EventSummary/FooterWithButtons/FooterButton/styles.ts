import { colors, radii } from '@abqm-ds/tokens';
import { Text } from '@abqm-ds/react';
import styled, { css } from 'styled-components';

interface StyledFooterButtonProps {
  disabled?: boolean;
}

export const ContainerFooterButton = styled.div<{ $isActive?: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: filter 0.5s ease-in-out;
  position: relative;

  button {
    width: 2.25rem;
    height: 2.25rem;
    margin-bottom: 2px;
  }
`;

// export const ActiveIndicator = styled.span`
//   position: absolute;
//   top: 0rem;
//   right: 42%;

//   width: 0.5rem;
//   height: 0.5rem;

//   border-radius: ${radii.full};
//   background-color: ${colors.green100};

//   box-shadow: 0 0 0 1px ${colors.green100};
//   z-index: 1;
// `;

export const StyledFooterButton = styled.button<StyledFooterButtonProps>`
  display: flex;
  padding: 0.25rem;
  justify-content: center;
  align-items: center;

  border: none;

  width: 1.375rem;
  height: 1.375rem;

  border-radius: ${radii.half};

  p {
    line-height: 0.875rem;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: red;
    `}
`;

export const StyledText = styled(Text).attrs({
  fontSize: 'xxs',
  color: colors.white50,
})``;
