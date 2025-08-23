import React from 'react';

import {
  Dropdown,
  getModalityIcon,
  getNameProveById,
  RoundedModalityButton,
} from '@abqm-ds/react';
import type { DataDropdown } from '@abqm-ds/react';

interface ModalityDropdownProps {
  provesDropdown: DataDropdown[];
  proveSelected: DataDropdown | null;
  setProveSelected: (value: DataDropdown) => void;
  handleGetSummary: (params: { prove_id_selected: string }) => void;
}

const ModalityDropdown: React.FC<ModalityDropdownProps> = ({
  provesDropdown,
  proveSelected,
  setProveSelected,
  handleGetSummary,
}) => {
  const IconComponent = getModalityIcon(Number(proveSelected?.id));
  const iconElement =
    typeof IconComponent === 'function' ? <IconComponent /> : <React.Fragment />;

  // useEffect(() => {
  //   console.log('ModalityDropdown:proveSelected', proveSelected);
  // }, [proveSelected]);
  return (
    <>
      <RoundedModalityButton
        style={{ width: 44, height: 44 }}
        icon={iconElement}
        svgFullWidth
        text={getNameProveById(Number(proveSelected?.id))}
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
