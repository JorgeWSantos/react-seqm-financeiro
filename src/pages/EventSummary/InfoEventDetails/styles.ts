import { colors, fontSizes, fontWeights, lineHeights } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const InfoEvent = styled.div`
  width: 100%;
  min-height: 3.75rem;
  display: flex;
  gap: 1.125rem;

  @media (max-width: 1400px) {
    padding: 0.25rem;
  }
`;

export const InfoEventDetailed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.125rem;
  flex-wrap: wrap;

  .title {
    color: ${colors.emeraldGreen75};
    font-size: ${fontSizes.xxs};
    font-weight: ${fontWeights.regular};
    line-height: ${lineHeights.shorter};
  }

  .subtitle {
    color: ${colors.emeraldGreen75};
    font-size: ${fontSizes.xxs};
    font-weight: ${fontWeights.semiBold};
    line-height: ${lineHeights.shorter};
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    .subtitle {
      margin: 0 !important;
    }
  }
`;
