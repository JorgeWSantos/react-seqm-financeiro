import React from 'react';
import SVG from './logo-seqm.svg';
import {
  PrintAreaWrapper,
  PrintAreaHeader,
  LogoWrapper,
  DetailsWrapper,
  DetailsInfo,
  IconWrapper,
  EventName,
  DivWrapper,
  DivTitle,
  DivCardsRow,
  DivCard,
} from './styles';
import { RanchSortingIconSEQM } from '@abqm-ds/icons';
import { TablePrintResultsSEQM } from './TablePrintResultsSEQM';
// import { TablePrintResultsSEQM } from './TablePrintResultsSEQM';

const PrintHeader: React.FC = () => {
  return (
    <PrintAreaHeader>
      <LogoWrapper>
        <img src={SVG} width={'170px'} alt="SEQM Logo" />
      </LogoWrapper>

      <DetailsWrapper>
        <EventName>NOME DO EVENTO</EventName>

        <DetailsInfo>
          <p>Nome do responsável do evento</p>
          <p>Cidade, UF</p>
          <p>00/00/0000 - 00/00/0000</p>
        </DetailsInfo>
      </DetailsWrapper>

      <IconWrapper>
        <RanchSortingIconSEQM width={'40pt'} height={'40pt'} fill="#424242" />
        <p style={{ marginTop: '-6pt' }}>Ranch Sorting</p>
      </IconWrapper>
    </PrintAreaHeader>
  );
};

const PrintArea = ({ columns, data }: { columns: any[]; data: any[] }) => {
  console.log('PrintArea columns:', columns);
  console.log('PrintArea data:', data);

  return (
    <PrintAreaWrapper id="print-area">
      <PrintHeader />

      <DivWrapper>
        <DivTitle>
          <p>RESUMO DA MODALIDADE</p>
        </DivTitle>
        <DivCardsRow>
          <DivCard>
            <p>DATA DO EVENTO</p>
            <p>00/00/0000</p>
          </DivCard>
          <DivCard>
            <p>DATA DO EVENTO</p>
            <p>00/00/0000</p>
          </DivCard>
          <DivCard>
            <p>DATA DO EVENTO</p>
            <p>00/00/0000</p>
          </DivCard>
          <DivCard>
            <p>DATA DO EVENTO</p>
            <p>00/00/0000</p>
          </DivCard>
        </DivCardsRow>
      </DivWrapper>

      <TablePrintResultsSEQM data={data} columns={columns} />
    </PrintAreaWrapper>
  );
};

export default PrintArea;
