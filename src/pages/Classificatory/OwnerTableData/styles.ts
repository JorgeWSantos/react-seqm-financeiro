import { Text } from '@abqm-ds/react';
import { breakpointsPx, colors, fontSizes, fontWeights } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const OwnerTableDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 1.25rem;

  @media (max-width: ${breakpointsPx.lg}) {
    height: 2rem;
  }
`;

export const StyledTextHallOfFameOwner = styled(Text).attrs({
  fontSize: 'xxs',
  fontWeight: 'semiBold',
})<{ $isHallOfFameOwner: boolean | undefined }>`
  display: flex;

  white-space: nowrap;
  color: ${({ $isHallOfFameOwner }) =>
    $isHallOfFameOwner ? colors.brown700 : 'inherit'};

  margin-bottom: -0.115rem;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.ssm};
  }
`;

export const StyledSubTextHallOfFame = styled(Text)`
  font-size: 5.5pt;
  font-weight: ${fontWeights.semiBold};
  color: ${colors.brown700};
  text-transform: uppercase;
  margin-top: -0.05rem;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.x};
  }
`;

export const MedalImg = styled.img`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
  margin-top: -0.06rem;
`;
