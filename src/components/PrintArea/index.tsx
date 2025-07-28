// ...existing code...
import {
  PrintAreaWrapper,
  DivWrapper,
  DivTitle,
  DivCardsRow,
  DivCard,
  DivTable,
} from './styles';
import { TablePrintResultsSEQM } from './TablePrintResultsSEQM';
import PrintHeader, { type PrintHeaderProps } from './PrintHeader';
import type { TableColumnSEQM, TableRowSEQM } from '@abqm-ds/react';

interface CardProps {
  title: string;
  value: string;
}

const PrintArea = ({
  title,
  columns,
  data,
  cards,
  info,
}: {
  title: string;
  columns: Array<TableColumnSEQM>;
  data: Array<TableRowSEQM>;
  cards: CardProps[];
  info: PrintHeaderProps;
}) => {
  return (
    <PrintAreaWrapper id="print-area">
      <PrintHeader data={info} />

      <DivWrapper>
        <DivTitle>
          <p>{title}</p>
        </DivTitle>

        <DivCardsRow>
          {cards.map((card, index) => (
            <DivCard key={index}>
              <p>{card.title}</p>
              <p>{card.value}</p>
            </DivCard>
          ))}
        </DivCardsRow>
      </DivWrapper>

      <DivTable>
        <TablePrintResultsSEQM data={data} columns={columns} />
      </DivTable>
    </PrintAreaWrapper>
  );
};

export default PrintArea;
