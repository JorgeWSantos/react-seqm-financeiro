// ============
// Modal

import { colors } from '@abqm-ds/tokens';
import styled, { css } from 'styled-components';

export const ContainerRadio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContentRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8;

  .custom-radio input[type='radio'] {
    display: none; /* Esconde o input nativo */
  }

  .custom-radio .radio-mark {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid #808080; /* Cor da borda */
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 8px;
    transition: border-color 0.2s;
    box-sizing: border-box;
    background: #fff;
    position: relative;
  }

  .custom-radio .radio-mark::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: transparent; /* Cor do círculo preenchido */
    border: 5px solid #808080; /* Cor do círculo preenchido */
    position: absolute;
    top: -1px;
    left: -1px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .custom-radio input[type='radio']:checked + .radio-mark::after {
    opacity: 1;
  }
`;
