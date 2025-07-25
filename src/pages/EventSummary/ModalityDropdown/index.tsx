import {
  Dropdown,
  getModalityIcon,
  getNameProveById,
  RoundedModalityButton,
} from '@abqm-ds/react';
import type { DataDropdown } from '@abqm-ds/react';
import React from 'react';

interface ModalityDropdownProps {
  prove_id: string | undefined;
  provesDropdown: DataDropdown[];
  proveSelected: DataDropdown | null;
  setProveSelected: (value: DataDropdown) => void;
  handleGetSummary: (params: { prove_id_selected: string }) => void;
}

const ModalityDropdown: React.FC<ModalityDropdownProps> = ({
  prove_id,
  provesDropdown,
  proveSelected,
  setProveSelected,
  handleGetSummary,
}) => {
  const IconComponent = getModalityIcon(Number(prove_id));
  const iconElement =
    typeof IconComponent === 'function' ? <IconComponent /> : <React.Fragment />;

  return (
    <>
      <RoundedModalityButton
        style={{ width: 44, height: 44 }}
        icon={iconElement}
        svgFullWidth
        text={getNameProveById(Number(prove_id))}
        variant="secondary"
      />
      <Dropdown
        variant="tertiary"
        data={provesDropdown}
        setValue={(value) => {
          setProveSelected(value);
          handleGetSummary({ prove_id_selected: value.id });
        }}
        value={proveSelected}
        maxHeight="26rem"
      />
    </>
  );
};

export default ModalityDropdown;
