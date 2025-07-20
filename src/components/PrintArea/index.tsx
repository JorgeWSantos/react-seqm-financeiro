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
import PrintHeader from './PrintHeader';

interface CardProps {
  title: string;
  value: string;
}

const PrintArea = ({
  columns,
  data,
  cards,
}: {
  columns: any[];
  data: any[];
  cards: CardProps[];
}) => {
  return (
    <PrintAreaWrapper id="print-area">
      <PrintHeader />

      <DivWrapper>
        <DivTitle>
          <p>RESUMO DA MODALIDADE</p>
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
