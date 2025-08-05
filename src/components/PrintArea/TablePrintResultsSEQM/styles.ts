import { Text } from '@abqm-ds/react';
import {
  breakpointsPx,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
} from '@abqm-ds/tokens';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledTablePrintResultsSEQM = styled.table<{
  $width?: CSSProperties['width'];
  $height?: CSSProperties['height'];
}>`
  border-collapse: collapse;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'unset'};
  display: flex;
  flex-direction: column;

  tbody tr:nth-child(odd) {
    background-color: ${colors.white25};
  }

  tbody tr:nth-child(even) {
    background-color: ${colors.grayFigma6};
  }

  font-family: ${fonts.default};
  color: ${colors.emeraldGreen75};
`;

export const StyledHeadTablePrintResultsSEQM = styled.thead`
  tr {
    display: flex;
  }

  tr th {
    padding: ${space[1]} ${space[2]};
  }
`;

export const StyledTablePrintResultsSEQMTextTh = styled(Text).attrs({
  fontWeight: 'bold',
  lineHeight: 'tight',
})`
  font-size: 6pt;
`;

export const StyledBodyTablePrintResultsSEQM = styled.tbody`
  tr {
    /* max-height: 2rem; */
    display: flex;
    flex-direction: row;
  }

  tr td {
    padding: 1rem ${space[2]};

    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -10pt;

    gap: 0.25rem;
  }

  span, p {
    white-space: normal !important;
  }

  svg {
    margin-bottom: -10pt;
  }

  .animal-table-data-container {
    .tooltip-anchor-divimage {
      display: none !important;
    }
  }
`;

export const StyledTablePrintResultsSEQMTextTd = styled(Text).attrs({
  fontWeight: 'regular',
  lineHeight: 'tight',
}) <{ $bold?: boolean }>`
  font-size: 8pt;
  font-weight: ${({ $bold }) => ($bold ? fontWeights.semiBold : fontWeights.regular)};
  color: ${colors.grayFigma2};

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.ssm};
    line-height: ${lineHeights.short};
  }
`;
