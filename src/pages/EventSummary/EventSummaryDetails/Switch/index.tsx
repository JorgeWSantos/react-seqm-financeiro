import { SwitchContainer, SwitchButton, SwitchKnob } from './styles';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch = ({ checked, onChange }: SwitchProps) => (
  <SwitchContainer>
    <SwitchButton
      onClick={onChange}
      aria-checked={checked}
      role="switch"
      $checked={checked}
    >
      <SwitchKnob $checked={checked} />
    </SwitchButton>
  </SwitchContainer>
);

export default Switch;
