import styled from 'styled-components';

/// tooltip
export const TooltipContent = styled.div`
  display: flex;
  justify-content: center;

  .tooltip-image,
  .tooltip-svg {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

export const TooltipContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  padding: 0.25rem 0.5rem;
`;
