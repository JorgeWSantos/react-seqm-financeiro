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
  onClick: () => void;
}

const RoundedButtonModalitie = ({
  icon,
  text,
  variant = 'default',
  onClick,
}: RoundedButtonModalityProps) => {
  return (
    <DivModality onClick={onClick}>
      <RoundedModalityButton icon={icon} text={text} variant={variant} />

      <StyledText>{text}</StyledText>
    </DivModality>
  );
};

export default RoundedButtonModalitie;
