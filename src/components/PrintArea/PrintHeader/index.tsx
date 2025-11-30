import SVG from '../logo-seqm.svg';
import {
  PrintAreaHeader,
  LogoWrapper,
  DetailsWrapper,
  IconWrapper,
  EventName,
} from './styles';
import { RanchSortingIconSEQM } from '@abqm-ds/icons';

export type PrintHeaderProps = {
  eventName: string;
  responsibleName: string;
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

        <p>{data.responsibleName}</p>
      </DetailsWrapper>

      <IconWrapper>
        <RanchSortingIconSEQM width={'40pt'} height={'40pt'} fill="#424242" />
        <p style={{ marginTop: '-6pt' }}>{data.modalityName}</p>
      </IconWrapper>
    </PrintAreaHeader>
  );
};

export default PrintHeader;
