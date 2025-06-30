import {
  DivModalitie,
  ImageModalitie,
  RoundedButton,
  StyledText,
  type VariantsRoundedButtonModalitie,
} from './styles';

interface RoundedButtonModalitieProps {
  icon: string;
  text: string;
  variant?: VariantsRoundedButtonModalitie;
}

const RoundedButtonModalitie = ({
  icon,
  text,
  variant = 'default',
}: RoundedButtonModalitieProps) => {
  return (
    <DivModalitie $variant={variant}>
      <RoundedButton className="rounded-button" $variant={variant}>
        <ImageModalitie src={icon} alt={text} $variant={variant} />
      </RoundedButton>

      <StyledText>{text}</StyledText>
    </DivModalitie>
  );
};

export default RoundedButtonModalitie;
