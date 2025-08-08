import { ContainerFooterButton, StyledText } from './styles';
import { RoundedButton } from '@abqm-ds/react';
import type { FooterButtonProps } from './types';

export const FooterButton = ({
  children,
  label,
  onClick,
  disabled,
  variant,
  isActive = false,
  showOptionsToShare, //used on mobile to show share options like Facebook, Twitter, etc.
}: FooterButtonProps) => {
  return (
    <ContainerFooterButton
      $isActive={isActive}
      onClick={disabled ? undefined : onClick}
      style={disabled ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
    >
      {/* {isActive && <ActiveIndicator />} */}
      <RoundedButton disabled={disabled} variant={variant}>
        {children}
      </RoundedButton>
      <StyledText disabled={disabled}>{label}</StyledText>

      {showOptionsToShare?.show && showOptionsToShare.children}
    </ContainerFooterButton>
  );
};

FooterButton.displayName = 'FooterButton';
