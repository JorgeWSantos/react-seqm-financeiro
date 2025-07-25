import { space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const PrintAreaHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: ${space[1]};

  border-bottom: 1px solid #ccc;
`;

export const LogoWrapper = styled.div`
  border-right: 1px solid #ccc;
  padding-right: ${space[2]};
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;

  padding-left: ${space[2]};
  padding-bottom: ${space[2]};
  min-height: 60pt !important;

  p {
    margin-top: -${space[2]};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 9pt;
  padding-bottom: ${space[2]};

  svg {
    margin-bottom: -${space[2]};
  }
`;

export const DetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  flex: 1;
  font-size: 9pt;
  gap: 4pt;
`;

export const EventName = styled.p`
  font-size: 13pt;
  font-weight: bold;
`;
