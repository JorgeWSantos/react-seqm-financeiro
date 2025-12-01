import SVG from '../logo-seqm.svg';
import { PrintAreaHeader, LogoWrapper, DetailsWrapper, EventName } from './styles';

export type PrintHeaderProps = {
  title: string;
  eventName: string;
  responsibleName: string;
};

const PrintHeader = ({ data }: { data: PrintHeaderProps }) => {
  return (
    <PrintAreaHeader>
      <LogoWrapper>
        <img src={SVG} width={'170px'} alt="SEQM Logo" />
      </LogoWrapper>

      <DetailsWrapper>
        <EventName>{data.title}</EventName>

        <p>{data.eventName}</p>
        <p className="responsibleName">{data.responsibleName}</p>
      </DetailsWrapper>
    </PrintAreaHeader>
  );
};

export default PrintHeader;
