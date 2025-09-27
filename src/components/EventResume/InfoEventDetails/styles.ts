import {
  breakpointsPx,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
} from '@abqm-ds/tokens';
import styled from 'styled-components';

export const InfoEvent = styled.div`
  width: 100%;
  /* min-height: 3.75rem; */
  display: flex;
  gap: 1.125rem;

  @media (max-width: 1400px) {
    padding: 0.25rem;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 70px;
  max-width: 70px;
  min-height: 60px;
  max-height: 60px;

  border-radius: ${radii.sm};
  border: ${radii.px} solid ${colors.white25};
  background-color: ${colors.white85};

  @media (max-width: ${breakpointsPx.lg}) {
    min-width: 65px;
    max-width: 65px;
    min-height: 65px;
    max-height: 65px;
    border: ${radii.px} solid ${colors.emeraldGreen25};
    background-color: transparent;
  }
`;

export const InfoEventDetailed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1400px) {
    gap: 0.25rem;
  }

  @media (max-width: ${breakpointsPx.lg}) {
    gap: 0.1rem;
  }
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
    color: ${colors.emeraldGreen92};
    font-size: ${fontSizes.xxs};
    font-weight: ${fontWeights.regular};
    line-height: ${lineHeights.shorter};
  }

  .organizer {
    color: ${colors.emeraldGreen75};
  }

  @media (max-width: 1400px) {
    flex-direction: column;


    .subtitle {
      margin: 0 !important;
    }
  }

  @media (max-width: ${breakpointsPx.xl}) {
    flex-direction: row;
  }

  @media (max-width: ${breakpointsPx.lg}) {
    .title {
      display: none;
    }
    .subtitle {
      font-size: ${fontSizes.ssm};
      line-height: ${lineHeights.shorter};

      &.organizer {
        line-height: ${lineHeights.short};
      }
    }
  }
`;
