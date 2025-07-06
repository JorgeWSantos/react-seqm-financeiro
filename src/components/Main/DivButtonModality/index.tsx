import {
  RoundedModalityButton,
  type VariantsRoundedModalityButton,
} from '@abqm-ds/react';
import { DivModality, StyledText } from './styles';
import type { ReactElement } from 'react';

interface RoundedButtonModalityProps {
  icon: ReactElement;
  text: string;
  variant?: VariantsRoundedModalityButton;
}

const RoundedButtonModalitie = ({
  icon,
  text,
  variant = 'default',
}: RoundedButtonModalityProps) => {
  return (
    <DivModality>
      <RoundedModalityButton icon={icon} text={text} variant={variant} />

      <StyledText>{text}</StyledText>
    </DivModality>
  );
};

export default RoundedButtonModalitie;
