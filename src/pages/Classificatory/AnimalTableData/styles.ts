import { LaurelIcon } from '@abqm-ds/icons';
import { Text } from '@abqm-ds/react';
import { breakpointsPx, colors, fontSizes, fontWeights } from '@abqm-ds/tokens';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const scaleImages = 1;
const scaleImagesMobile = 1.05;

export const ContainerImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 1.25rem;

  @media (max-width: ${breakpointsPx.lg}) {
    height: 2rem;
  }
`;

export const DivImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 1.188rem;

  img,
  .image-animal-default {
    transform: scale(${scaleImages});
    position: relative;
    border-radius: 50%;
    min-width: 1.188rem;
    max-width: 1.188rem;
    height: 1.188rem;
    object-fit: cover;
    border: 1px solid transparent;
    z-index: 1;

    @media (max-width: ${breakpointsPx.lg}) {
      transform: scale(${scaleImagesMobile});
    }
  }
`;

export const DivBorder = styled.div<{ $medalColor: string }>`
  position: absolute;
  left: -0.05rem;
  top: -0.05rem;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid ${({ $medalColor }) => $medalColor};
  z-index: 0;
  transform: scale(${scaleImages});

  @media (max-width: ${breakpointsPx.lg}) {
    transform: scale(${scaleImagesMobile});
  }
`;

export const LaurelImage = styled(LaurelIcon)`
  position: absolute;
  margin-top: 0.05rem;
  left: -0.05rem;
  width: 1.3rem;
  height: 1.3rem;
  z-index: 2;
  transform: scale(${scaleImages});

  @media (max-width: ${breakpointsPx.lg}) {
    transform: scale(${scaleImagesMobile});
  }
`;

export const DivInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 100%;
`;

export const DivTexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledTextHallOfFameNameAnimal = styled(Text).attrs({
  fontSize: 'xxs',
  fontWeight: 'semiBold',
})<{ $isHallOfFameAnimal: boolean | undefined }>`
  display: flex;
  white-space: nowrap;
  color: ${({ $isHallOfFameAnimal }) =>
    $isHallOfFameAnimal ? colors.brown700 : 'inherit'};
  height: 14px;
  margin-bottom: -0.1rem;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.ssm};
  }
`;

export const StyledTextHallOfFame = styled(Text)`
  font-size: 5.5pt;
  font-weight: ${fontWeights.semiBold};
  color: ${colors.brown700};
  text-transform: uppercase;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.x};
  }
`;

export const StyledTextRegister = styled(Text)`
  font-size: 5.5pt;
  font-weight: ${fontWeights.semiBold};
  /* color: ${colors.brown700}; */
  text-transform: uppercase;
  margin-bottom: -0.08rem;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.xxs};
  }
`;

export const MedalImg = styled.img`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
  margin-top: -0.06rem;
`;

/// tooltip
export const StyledTooltip = styled(Tooltip)<{ hasSomething?: boolean }>`
  background-color: white !important;
  z-index: 999999;
  padding: 0.25rem 1rem 0.25rem 0.25rem !important;
  border-radius: 0.5rem !important;
  display: ${({ hasSomething }) => (hasSomething ? 'flex' : 'none')} !important;
  display: flex;

  /* Aplica apenas se a tooltip estiver com a classe de topo */
  &.react-tooltip__place-top,
  &.react-tooltip__place-bottom {
    transform: translateX(45%) !important;
    .react-tooltip-arrow {
      left: 10px !important;
    }
  }
`;
