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
  onChange: (value: DataDropdown) => void;
}

const ModalityDropdown: React.FC<ModalityDropdownProps> = ({
  provesDropdown,
  proveSelected,
  onChange,
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
        setValue={onChange}
        value={proveSelected}
        maxHeight="26rem"
      />
    </>
  );
};

export default ModalityDropdown;
