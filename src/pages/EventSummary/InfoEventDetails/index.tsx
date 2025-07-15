import { EventSummaryDefaultIcon } from '@abqm-ds/icons';
import { InfoEvent, InfoEventDetailed, Information } from './styles';
import type { InfoEventSummaryData } from '../types.api';

const InfoEventDetails = ({ data }: { data: InfoEventSummaryData | null }) => {
  return (
    <InfoEvent>
      <EventSummaryDefaultIcon width={70} style={{ minWidth: 70 }} />

      <InfoEventDetailed>
        <Information>
          <p className="title">organizador</p>
          <p className="subtitle" style={{ marginLeft: '0.1rem' }}>
            {data?.organizador || '--'}
          </p>
        </Information>

        <Information>
          <p className="title">local</p>
          <p className="subtitle" style={{ marginLeft: '2.5rem' }}>
            {data?.local || '--'}
          </p>
        </Information>

        <Information>
          <p className="title">data</p>
          <p className="subtitle" style={{ marginLeft: '2.5rem' }}>
            {data?.data_inicio || '--'} - {data?.data_fim || '--'}
          </p>
        </Information>
      </InfoEventDetailed>
    </InfoEvent>
  );
};

export default InfoEventDetails;
