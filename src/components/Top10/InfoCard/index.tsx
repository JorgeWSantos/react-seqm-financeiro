import React from 'react';

import { Text } from '@abqm-ds/react';
import { colors } from '@abqm-ds/tokens';

import { Container } from './styles';

interface ItemCardProps {
  title: string;
  info: string | number;
  reverse?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, info, reverse = false }) => {
  return (
    <Container $reverse={reverse}>
      {reverse ? (
        <>
          <Text fontSize='xxs' color={colors.white50} fontWeight='regular' lineHeight='shorter'>{title}</Text>
          <Text fontSize='ssm' color={colors.white85} fontWeight='semiBold' lineHeight='tight'>{info}</Text>
        </>
      ) : (
        <>
          <Text fontSize='ssm' color={colors.white85} fontWeight='semiBold' lineHeight='tight'>{info}</Text>
          <Text fontSize='xxs' color={colors.white50} fontWeight='regular' lineHeight='shorter'>{title}</Text>
        </>
      )}
    </Container>
  );
};

export default ItemCard;