import { breakpointsPx, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ShareOptionsContainer = styled.div`
  position: absolute;
  right: 1.875rem;
  top: 4rem;
  z-index: 9999;
  background: white;
  border: ${radii.px} solid #eee;
  border-radius: ${space[2]};
  padding: ${space[4]};
  display: flex;
  gap: ${space[3]};
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: -0.5rem;
    right: 2.5rem;
    border-width: 0 ${radii.md} ${radii.md} ${radii.md};
    border-style: solid;
    border-color: transparent transparent white transparent;
    display: block;
  }

  @media (max-width: ${breakpointsPx.lg}) {
    top: unset;
    bottom: 4.5rem;

    &::after {
      content: '';
      position: absolute;
      top: 4rem;
      right: 2.5rem;
      border-width: ${radii.md} ${radii.md} 0 ${radii.md};
      border-style: solid;
      border-color: white transparent transparent transparent;
      display: block;
    }
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
