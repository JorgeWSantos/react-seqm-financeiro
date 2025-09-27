import { Heading } from '@abqm-ds/react';
import { breakpointsPx, colors, radii, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const ContainerMain = styled.div`
  position: relative;
`;

export const ContainerMainMobile = styled.div`
  height: 100%;
`;

export const LinkToRedirect = styled.span`
  cursor: pointer;
  text-decoration: none;
`;

export const Scrollable = styled.div`
  width: 100%;
  height: 100%;
  /* overflow-y: auto;
  overflow-x: auto; */
  display: flex;
  gap: 1.5rem;

  @media (max-width: ${breakpointsPx.lg}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const DivLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
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

// MOBILE
export const StyledHeadingMobile = styled(Heading).attrs({
  fontFamily: 'secondary',
  fontWeight: 'regular',
})`
  color: ${colors.green900};
  letter-spacing: -0.15rem;
`;


// ------------- MOBILE

export const ContainerHeaderMobile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 0.5rem 0 0.5rem;
`;

export const ContainerTopMobile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0 0.5rem;
`;

export const ContainerBottomMobile = styled.div`
  width: 100%;
  height: 100%;
`;

