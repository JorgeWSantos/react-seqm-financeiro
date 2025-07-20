import {
  StyledBodyTablePrintResultsSEQM,
  StyledHeadTablePrintResultsSEQM,
  StyledTablePrintResultsSEQM,
  StyledTablePrintResultsSEQMTextTd,
  StyledTablePrintResultsSEQMTextTh,
} from './styles';
import type { TablePrintResultsSEQMProps } from './types';

export const TablePrintResultsSEQM = ({
  columns,
  data,
  width,
  height,
  ...rest
}: TablePrintResultsSEQMProps) => {
  return (
    <StyledTablePrintResultsSEQM $width={width} $height={height} {...rest}>
      <StyledHeadTablePrintResultsSEQM>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                width: col.width,
                maxWidth: col.width,
                minWidth: col.minWidth,
                textAlign: col.align || 'left',
              }}
            >
              <StyledTablePrintResultsSEQMTextTh>
                {col.label}
              </StyledTablePrintResultsSEQMTextTh>
            </th>
          ))}
        </tr>
      </StyledHeadTablePrintResultsSEQM>
      <StyledBodyTablePrintResultsSEQM>
        {data.map((row, idx) => (
          <tr key={idx} className={row.isOficial ? 'aqha-column' : ''}>
            {columns.map((col) => (
              <td
                key={col.key}
                style={{
                  width: col.width,
                  maxWidth: col.width,
                  minWidth: col.minWidth,
                  textAlign: col.align || 'left',
                }}
              >
                {col.render ? (
                  col.render(row)
                ) : (
                  <StyledTablePrintResultsSEQMTextTd
                    {...(col.textBold && { $bold: true })}
                  >
                    {row[col.key]}
                  </StyledTablePrintResultsSEQMTextTd>
                )}
              </td>
            ))}
          </tr>
        ))}
      </StyledBodyTablePrintResultsSEQM>
    </StyledTablePrintResultsSEQM>
  );
};

TablePrintResultsSEQM.displayName = 'TablePrintResultsSEQM';

export {
  StyledTablePrintResultsSEQMTextTd,
  StyledTablePrintResultsSEQMTextTh,
} from './styles';
