import { Text } from '@abqm-ds/react';
import { colors, fontWeights } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const DivImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 1.188rem;

  .image-bg {
    position: absolute;
    left: -0.11rem;
    /* left: 50%;
    top: 50%; */
    /* transform: translate(-50%, -50%); */
    width: 1.4rem;
    height: 1.45rem;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid ${colors.yellow200};
    z-index: 0;
    transform: scale(1);
  }

  img {
    transform: scale(1);
    position: relative;
    border-radius: 50%;
    width: 1.188rem;
    height: 1.188rem;
    object-fit: cover;
    border: 1px solid transparent;
    z-index: 1;
  }
`;

export const LaurelImage = styled.img`
  position: absolute;
  top: 0.05rem;
  left: -1.4rem;
  min-width: 1.6rem;
  min-height: 1.6rem;
  z-index: 2;
`;

export const DivInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const DivTexts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTextHallOfFame = styled(Text)`
  font-size: 5.5pt;
  font-weight: ${fontWeights.semiBold};
  color: ${colors.brown700};
  text-transform: uppercase;
  margin-top: -0.05rem;
`;
