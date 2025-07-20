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
    max-height: 2rem;
  }

  tr td {
    padding: 0.5625rem ${space[2]};
  }

  @media (max-width: ${breakpointsPx.lg}) {
    tr td {
      padding: ${space[2]};
    }
  }
`;

export const StyledTablePrintResultsSEQMTextTd = styled(Text).attrs({
  fontWeight: 'regular',
  lineHeight: 'tight',
})<{ $bold?: boolean }>`
  font-size: 8pt;
  font-weight: ${({ $bold }) => ($bold ? fontWeights.semiBold : fontWeights.regular)};
  max-height: 1rem;
  color: ${colors.grayFigma2};
  margin-top: -0.875rem;

  @media (max-width: ${breakpointsPx.lg}) {
    font-size: ${fontSizes.ssm};
    line-height: ${lineHeights.short};
  }
`;
