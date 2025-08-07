import { colors, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const FooterWithButtonsWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 0pt;
  width: 100%;
  z-index: 9999;
  /* left: 0; */

  backdrop-filter: blur(50px);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
  background-color: ${colors.emeraldGreen50};
  border-bottom: 1px solid ${colors.emeraldGreen92};

  padding: ${space[2]} ${space[6]};
`;
