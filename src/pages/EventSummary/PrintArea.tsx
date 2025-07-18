import React from 'react';
import SVG from './logo-seqm.svg';
import {
  PrintAreaWrapper,
  PrintAreaContainer,
  LogoWrapper,
  DetailsWrapper,
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              flex: 1,
              fontSize: '9pt',
              gap: '4pt',
            }}
          >
            <p>Nome do responsável do evento</p>
            <p>Cidade, UF</p>
            <p>00/00/0000 - 00/00/0000</p>
          </div>
        </DetailsWrapper>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            fontSize: '9pt',
            paddingBottom: '4pt',
          }}
        >
          <RanchSortingIconSEQM width={'40pt'} height={'40pt'} fill="#424242" />
          <p style={{ marginTop: '-6pt' }}>Ranch Sorting</p>
        </div>
      </PrintAreaContainer>
    </PrintAreaWrapper>
  );
};

export default PrintArea;
