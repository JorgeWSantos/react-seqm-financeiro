import React from 'react';
import SVG from './logo-seqm.svg';
import {
  PrintAreaWrapper,
  PrintAreaContainer,
  LogoWrapper,
  DetailsWrapper,
  EventName,
} from './PrintArea.styles';

const PrintArea: React.FC = () => {
  return (
    <PrintAreaWrapper id="print-area">
      <PrintAreaContainer>
        <LogoWrapper>
          <img src={SVG} width={'170px'} />
        </LogoWrapper>
        <DetailsWrapper>
          <EventName>NOME DO EVENTO</EventName>
          <p>Este é um exemplo de tela de impressão simples.</p>
        </DetailsWrapper>
      </PrintAreaContainer>
    </PrintAreaWrapper>
  );
};

export default PrintArea;
