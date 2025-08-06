import styled from 'styled-components';

interface ContainerProps {
  $active?: boolean;
  $color?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 0px 0px;
  width: 121px;
  height: 24px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  border-radius: 6px 6px 0 0;
  border-top: 1px solid var(--Branco-25, rgba(255, 255, 255, 0.25));
  border-right: 1px solid var(--Branco-25, rgba(255, 255, 255, 0.25));
  border-left: 1px solid var(--Branco-25, rgba(255, 255, 255, 0.25));

  cursor: pointer;
  background: ${({ $active, $color }) => ($active ? $color : 'transparent')};
  border-bottom: ${({ $active, $color }) =>
    $active ? `2px solid ${$color}` : '2px solid transparent'};
  transition: background 0.2s, border-bottom 0.2s;
`;
