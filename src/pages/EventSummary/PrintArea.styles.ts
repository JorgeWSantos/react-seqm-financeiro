import styled from 'styled-components';

export const PrintAreaWrapper = styled.div`
  position: absolute;
  left: 200px;
  padding: 20pt;
  text-align: center;
  width: 210mm;
  height: 297mm;
  background-color: #f5f5f5;
`;

export const PrintAreaContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  border-right: 1px solid #ccc;
  padding-right: 8px;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
  padding-left: 8px;
  min-height: 60pt;
`;

export const EventName = styled.p`
  font-size: 13pt;
  font-weight: bold;
`;
