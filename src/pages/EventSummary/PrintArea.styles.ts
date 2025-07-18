import styled from 'styled-components';

export const PrintAreaWrapper = styled.div`
  position: absolute;
  left: 200px;
  padding: 20pt;
  /* left: -9999px; */
  text-align: center;
  width: 210mm;
  height: 297mm;
  background-color: white;
`;

export const PrintAreaContainer = styled.div`
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
  padding-bottom: 4pt;
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
