import { EventSummaryDefaultIcon } from '@abqm-ds/icons';
import { InfoEvent, InfoEventDetailed, Information } from './styles';

const InfoEventDetails = () => {
  return (
    <InfoEvent>
      <EventSummaryDefaultIcon width={70} style={{ minWidth: 70 }} />

      <InfoEventDetailed>
        <Information>
          <p className="title">organizador</p>
          <p className="subtitle" style={{ marginLeft: '0.1rem' }}>
            ABQM
          </p>
        </Information>

        <Information>
          <p className="title">local</p>
          <p className="subtitle" style={{ marginLeft: '2.5rem' }}>
            Recinto de Exposições Clibas de Almeida Prado, SP
          </p>
        </Information>

        <Information>
          <p className="title">data</p>
          <p className="subtitle" style={{ marginLeft: '2.5rem' }}>
            11/04/2025 - 27/04/2025
          </p>
        </Information>
      </InfoEventDetailed>
    </InfoEvent>
  );
};

export default InfoEventDetails;
