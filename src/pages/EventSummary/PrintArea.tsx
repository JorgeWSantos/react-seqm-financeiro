import React from 'react';
import SVG from './logo-seqm.svg';
import {
  PrintAreaWrapper,
  PrintAreaContainer,
  LogoWrapper,
  DetailsWrapper,
  DetailsInfo,
  IconWrapper,
  EventName,
} from './PrintArea.styles';
import { RanchSortingIconSEQM } from '@abqm-ds/icons';

const PrintArea: React.FC = () => {
  return (
    <PrintAreaWrapper id="print-area">
      <PrintAreaContainer>
        <LogoWrapper>
          <img src={SVG} width={'170px'} />
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
      </PrintAreaContainer>
    </PrintAreaWrapper>
  );
};

export default PrintArea;
