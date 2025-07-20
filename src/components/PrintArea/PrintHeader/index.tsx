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

export type PrintHeaderProps = {
  eventName: string;
  responsibleName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  modalityName: string;
};

const PrintHeader = ({ data }: { data: PrintHeaderProps }) => {
  return (
    <PrintAreaHeader>
      <LogoWrapper>
        <img src={SVG} width={'170px'} alt="SEQM Logo" />
      </LogoWrapper>

      <DetailsWrapper>
        <EventName>{data.eventName}</EventName>

        <DetailsInfo>
          <p>{data.responsibleName}</p>
          <p>
            {data.city}, {data.state}
          </p>
          <p>
            {data.startDate} - {data.endDate}
          </p>
        </DetailsInfo>
      </DetailsWrapper>

      <IconWrapper>
        <RanchSortingIconSEQM width={'40pt'} height={'40pt'} fill="#424242" />
        <p style={{ marginTop: '-6pt' }}>{data.modalityName}</p>
      </IconWrapper>
    </PrintAreaHeader>
  );
};

export default PrintHeader;
