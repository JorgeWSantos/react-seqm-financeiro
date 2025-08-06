import React from 'react';

import { Container } from './styles';
import { Text } from '@abqm-ds/react';
import { colors } from '@abqm-ds/tokens';

interface TabOptionProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const TabOption: React.FC<TabOptionProps> = ({ title, active = false, onClick }) => {
  return (
    <Container onClick={onClick} $active={active} $color={colors.blue700}>
      <Text
        fontSize="xxs"
        color={active ? colors.white : colors.white85}
        fontWeight={active ? 'bold' : 'regular'}
        lineHeight="shorter"
      >
        {title}
      </Text>
    </Container>
  );
};

export default TabOption;
