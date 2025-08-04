import React from 'react';

import { Container } from './styles';
import { Text } from '@abqm-ds/react';
import { colors } from '@abqm-ds/tokens';

interface ItemCardProps {
  title: string;
}


const ItemCard: React.FC<ItemCardProps> = ({ title }) => {
  return  <Container>
            <Text fontSize='xxs' color={colors.white85} fontWeight='regular' lineHeight='shorter'>{title}</Text>
          </Container>;
};

export default ItemCard;
