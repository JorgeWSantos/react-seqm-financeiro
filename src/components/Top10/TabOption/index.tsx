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
    <Container onClick={onClick} $active={active} $color={colors.emeraldGreen10}>
      <Text
        fontSize="xxs"
        color={colors.white85}
        fontWeight="regular"
        lineHeight="shorter"
      >
        {title}
      </Text>
    </Container>
  );
};

export default TabOption;
