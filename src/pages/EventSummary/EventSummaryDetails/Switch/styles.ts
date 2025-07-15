import styled from 'styled-components';
import { colors } from '@abqm-ds/tokens';

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SwitchButton = styled.button<{ $checked: boolean }>`
  width: 2rem;
  height: 1rem;
  border-radius: 1rem;
  background: ${({ $checked }) => ($checked ? colors.white50 : colors.white25)};
  border: none;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
`;

export const SwitchKnob = styled.span<{ $checked: boolean }>`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: ${colors.white};
  position: absolute;
  top: -2px;
  left: ${({ $checked }) => ($checked ? '0.8rem' : '0')};
  transition: left 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;
