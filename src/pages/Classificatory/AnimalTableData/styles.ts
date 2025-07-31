import { LaurelIcon, MedalIcon } from '@abqm-ds/icons';
import { Text } from '@abqm-ds/react';
import { colors, fontWeights } from '@abqm-ds/tokens';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const scaleImages = 1;

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

  img,
  svg {
    transform: scale(${scaleImages});
    position: relative;
    border-radius: 50%;
    width: 1.188rem;
    height: 1.188rem;
    object-fit: cover;
    border: 1px solid transparent;
    z-index: 1;
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
`;

export const LaurelImage = styled(LaurelIcon)`
  position: absolute;
  top: 0rem;
  left: -0.05rem;
  width: 1.3rem;
  height: 1.3rem;
  z-index: 2;
  transform: scale(${scaleImages});
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

export const MedalImg = styled(MedalIcon)`
  width: 0.75rem;
  height: 0.75rem;
  margin-top: -0.075rem;
`;

/// tooltip
export const StyledTooltip = styled(Tooltip)<{ hasSomething?: boolean }>`
  background-color: white !important;
  z-index: 999999;
  padding: 0.25rem 1rem 0.25rem 0.25rem !important;
  border-radius: 0.5rem !important;
  display: ${({ hasSomething }) => (hasSomething ? 'flex' : 'none')} !important;
  display: flex;
`;
