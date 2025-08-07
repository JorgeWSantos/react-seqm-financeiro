import { colors } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const PrintAreaWrapper = styled.div`
  position: absolute;
  left: 200px;
  left: -9999px;
  text-align: center;
  width: 210mm;
  background-color: white;
`;

export const PrintAreaHeader = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 2pt;

  border-bottom: 1px solid #ccc;
`;

export const LogoWrapper = styled.div`
  border-right: 1px solid #ccc;
  padding-right: 8px;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;

  padding-left: 8px;
  padding-bottom: 5pt;
  min-height: 60pt !important;
  /* background-color: red; */

  p {
    margin-top: -7pt;
  }
`;

export const EventName = styled.p`
  font-size: 13pt;
  font-weight: bold;
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

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 9pt;
  padding-bottom: 5pt;

  svg {
    margin-bottom: -8pt;
  }
`;

// --------content

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* margin-top: 8pt; */
`;
export const DivTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 8pt;
  gap: 3rem;
`;

export const DivTitle = styled.div`
  margin-bottom: 12pt;
  p {
    font-size: 14pt;
    font-weight: bold;
    margin: 0;
  }
`;

export const DivCardsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 6pt;
`;

export const DivCard = styled.div`
  width: 100%;
  height: 40pt;
  background-color: ${colors.grayFigma5};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding-bottom: 10pt;

  p {
    font-size: 6pt;
  }

  p + p {
    font-size: 11pt;
  }
`;
