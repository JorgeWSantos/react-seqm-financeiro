import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { StyledTablePrintResultsSEQM } from './styles';

export interface TablePrintResultsSEQMProps
  extends ComponentProps<typeof StyledTablePrintResultsSEQM> {
  columns: Array<TablePrintResultsColumnSEQM<any>>;
  data: Record<string, any>[];
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
}

export interface TablePrintResultsColumnSEQM<T> {
  key: string;
  label: string;
  width?: CSSProperties['width'];
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => ReactNode;
  minWidth?: CSSProperties['minWidth'];
  textBold?: boolean;
}
