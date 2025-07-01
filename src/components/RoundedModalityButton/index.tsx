import {
  ImageModalitie,
  RoundedButton,
  type VariantsRoundedModalityButton,
} from './styles';

interface RoundedButtonModalitieProps {
  icon: string;
  text: string;
  variant?: VariantsRoundedModalityButton;
}

const RoundedModalityButton = ({
  icon,
  text,
  variant = 'default',
}: RoundedButtonModalitieProps) => {
  return (
    <RoundedButton className="rounded-button" $variant={variant}>
      <ImageModalitie src={icon} alt={text || 'Botão Modalidade'} $variant={variant} />
    </RoundedButton>
  );
};

export default RoundedModalityButton;
