import type { RoundedButtonVariants } from "@abqm-ds/react";
import type { MouseEvent, ReactNode } from "react";

export interface FooterButtonProps {
  children: ReactNode; //icon
  disabled?: boolean;
  isActive?: boolean;
  label: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  variant?: RoundedButtonVariants;
  showOptionsToShare?: {
    children: ReactNode;
    show?: boolean;
  };
}
