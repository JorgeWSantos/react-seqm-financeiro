import {
  PrintAreaWrapper,
  DivWrapper,
  DivTitle,
  DivCardsRow,
  DivCard,
  DivTable,
  PrintContainer,
  FooterPrint,
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
  totalForPage,
  ref,
}: {
  title: string;
  columns: Array<TableColumnSEQM>;
  data: Array<TableRowSEQM>;
  cards: CardProps[];
  info: PrintHeaderProps;
  totalForPage?: number;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const totalPages = Math.ceil(data.length / (totalForPage ?? data.length));
  const totalByPage = totalForPage ?? data.length;

  return (
    <PrintAreaWrapper id="print-area" ref={ref}>
      {Array.from({ length: totalPages }).map((_, pageIndex) => {
        return (
          <PrintContainer key={pageIndex}>
            <PrintHeader data={info} />

            {pageIndex === 0 && (
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
            )}

            <DivTable>
              <TablePrintResultsSEQM
                data={data.slice(pageIndex * totalByPage, (pageIndex + 1) * totalByPage)}
                columns={columns}
              />
            </DivTable>

            <FooterPrint>
              <p>
                {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
              </p>
              <p>
                Página {pageIndex + 1} de {totalPages}
              </p>
            </FooterPrint>
          </PrintContainer>
        );
      })}
    </PrintAreaWrapper>
  );
};

export default PrintArea;
