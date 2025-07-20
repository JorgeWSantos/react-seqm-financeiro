import { EventSummaryDefaultIcon } from '@abqm-ds/icons';
import { InfoEvent, InfoEventDetailed, Information } from './styles';
import type { InfoEventSummaryData } from '../../../pages/EventSummary/types.api';
import { fontWeights } from '@abqm-ds/tokens';

const InfoEventDetails = ({ data }: { data: InfoEventSummaryData | null }) => {
  return (
    <InfoEvent>
      {data?.logotipo ? (
        <img
          src={data.logotipo}
          alt="Logotipo do evento"
          width={80}
          height={80}
          style={{ minHeight: 80, minWidth: 80 }}
        />
      ) : (
        <EventSummaryDefaultIcon
          width={70}
          height={60}
          style={{ minHeight: 60, minWidth: 70 }}
        />
      )}

      <InfoEventDetailed>
        <Information>
          <p className="title">organizador</p>
          <p
            className="subtitle"
            style={{ marginLeft: '0.1rem', fontWeight: fontWeights.semiBold }}
          >
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
