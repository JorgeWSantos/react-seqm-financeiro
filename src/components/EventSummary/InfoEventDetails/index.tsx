import React, { useState } from 'react';
import { EventSummaryDefaultIcon } from '@abqm-ds/icons';
import { ImageContainer, InfoEvent, InfoEventDetailed, Information } from './styles';
import { fontWeights } from '@abqm-ds/tokens';
import type { InfoEventData } from '@src/services/General/types.info-event.api';

const InfoEventDetails = ({ data }: { data: InfoEventData | null }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <InfoEvent>
      <ImageContainer>
        {data?.logotipo && !imgError ? (
          <img
            src={data.logotipo}
            alt="Logotipo do evento"
            style={{ minHeight: '100%', minWidth: '100%' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <EventSummaryDefaultIcon style={{ minHeight: '100%', minWidth: '100%' }} />
        )}
      </ImageContainer>

      <InfoEventDetailed>
        <Information>
          <p className="title">organizador</p>
          <p
            className="subtitle organizer"
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
