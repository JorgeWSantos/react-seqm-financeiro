import styled from 'styled-components';

import { colors } from '@abqm-ds/tokens';

interface ContainerProps {
  $active?: boolean;
  $color?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;

  max-width: 170px;
  height: 24px;

  border-radius: 6px 6px 0 0;
  border-top: 1px solid ${colors.white25};
  border-right: 1px solid ${colors.white25};
  border-left: 1px solid ${colors.white25};

  cursor: pointer;
  background: ${({ $active, $color }) => ($active ? $color : 'transparent')};
  transition: background 0.3s ease;
`;
