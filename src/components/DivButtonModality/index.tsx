import RoundedModalityButton from '../RoundedModalityButton';
import type { VariantsRoundedModalityButton } from '../RoundedModalityButton/styles';
import { DivModality, StyledText } from './styles';

interface RoundedButtonModalityProps {
  icon: string;
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
