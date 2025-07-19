import { colors, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerMain = styled.div`
  height: 100%;
`;

export const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  gap: 1.5rem;
`;

export const DivLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  padding-top: 0.5rem;
`;

export const DivRight = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
`;

export const DivTopRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${space[1]} ${space[1]};
  margin: 0 auto;

  border-bottom: ${radii.px} solid ${colors.white25};
  border-radius: 8px;
  position: relative;
`;

export const DivContainerTableRight = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const DivDropDownSearch = styled.div`
  display: flex;
  align-items: center;
  width: 20rem;

  gap: ${space[2]};
`;

export const ButtonTop10 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  justify-self: flex-end;

  width: 6.75rem;
  height: 2rem;
  padding: ${space[2]} ${space[4]};

  border: ${radii.pxx} solid #a9bd9f;
  border-radius: 1.875rem;
  background-color: ${colors.black50};
  cursor: pointer;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
    transition: filter 0.3s ease;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

export const DivTopMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.white25};
  padding-bottom: 0.375rem;
`;

export const DivInfoCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.125rem;
`;
