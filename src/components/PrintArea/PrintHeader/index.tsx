import React from 'react';
import SVG from '../logo-seqm.svg';
import {
  PrintAreaHeader,
  LogoWrapper,
  DetailsWrapper,
  DetailsInfo,
  IconWrapper,
  EventName,
} from './styles';
import { RanchSortingIconSEQM } from '@abqm-ds/icons';

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

export default PrintHeader;
