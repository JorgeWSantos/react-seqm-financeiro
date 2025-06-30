import { Heading, Text } from '@abqm-ds/react';
import { colors, fontWeights, space } from '@abqm-ds/tokens';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0rem 2.5rem;
`;

export const HeadingModalities = styled(Heading).attrs({
  // fontSize: 'ssm',
  // lineHeight: 'tight',
  // fontWeight: 'regular',
  fontSize: 'ssm',
})`
  color: ${colors.emeraldGreen75};
  display: flex;
  flex-direction: column;
`;

export const ContentModalities = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  flex-wrap: wrap;
  border-radius: 0.625rem;

  border: 1px solid ${colors.green500};
`;

export const DivModalitie = styled.div`
  display: flex;
  padding: ${space[1]} ${space[1]} 0rem ${space[1]};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 6.5rem;

  text-align: center;

  cursor: pointer;

  & img,
  & span,
  & p {
    transition: filter 0.5s, text-shadow 0.3s, color 0.3s;
  }

  &:hover img,
  &:hover span,
  &:hover p {
    filter: brightness(130%);
    text-shadow: 0 0 1px ${colors.emeraldGreen25}, 0 0 1px ${colors.emeraldGreen25};
    color: ${colors.emeraldGreen75};
  }
`;

export const RoundedButton = styled.button`
  display: flex;
  width: 6.25rem;
  height: 6.25rem;
  justify-content: center;
  align-items: center;

  border: 4px solid ${colors.white25};

  border-radius: 50%;
  gap: 0.5rem;
  aspect-ratio: 1/1;

  cursor: pointer;
`;

export const ImageModalitie = styled.img`
  width: 100%;
  height: 100%;

  background-color: ${colors.green500};
  padding: 0.5rem;

  border-radius: 50%;
  gap: 0.5rem;
  aspect-ratio: 1/1;
`;

export const StyledText = styled(Text).attrs({
  fontSize: 'ssm',
  fontWeight: 'regular',
  lineHeight: 'tight',
})`
  color: ${colors.emeraldGreen75};
`;
