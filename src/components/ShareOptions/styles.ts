import styled from 'styled-components';

export const ShareOptionsContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  z-index: 9999;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 40px;
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    display: block;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
