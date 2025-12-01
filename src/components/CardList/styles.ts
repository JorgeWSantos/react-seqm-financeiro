import { Text } from "@abqm-ds/react";
import { colors } from "@abqm-ds/tokens";
import styled from "styled-components";

interface CardListProps {
  $isEven: boolean;
}

export const CardListContainer = styled.div<CardListProps>`
  background-color: ${({ $isEven }) =>
    $isEven ? colors.white25 : colors.greenTransparent15};
  padding: 0.5rem;

  transition: filter 0.2s;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9) contrast(1.2);
  }
`;

export const StyledText = styled(Text).attrs({
  fontSize: "xxs",
  fontWeight: "semiBold",
})`
  color: ${colors.emeraldGreen75};
  line-height: 0.875rem;
`;