import {
  Button,
  Dropdown,
  Modal,
  RadioGroup,
  type DataDropdown,
  type RadioGroupOption,
} from '@abqm-ds/react';
import { DivButton, DivGroup, ModalContent, TextGroup } from './styles';
import type { ModalDetailsFilter } from '../types';
import type { Dispatch, SetStateAction } from 'react';

interface ModalFilterProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleApplyFilter: () => void;
  handleClearFilter: () => void;
  item: any | null;
  filter: {
    year: DataDropdown;
    month: DataDropdown;
    oficial: RadioGroupOption;
  };
  setFilter: Dispatch<SetStateAction<ModalDetailsFilter>>;
  years: DataDropdown[];
  months: DataDropdown[];
  optionsOficial: RadioGroupOption[];
}

export const ModalFilter = ({
  handleCloseModal,
  handleApplyFilter,
  handleClearFilter,
  isModalOpen,
  item,
  filter,
  setFilter,
  years,
  months,
  optionsOficial,
}: ModalFilterProps) => {
  return (
    <Modal
      title="Filtro"
      isFiltered={true}
      isOpen={isModalOpen}
      onClickCleanFilter={handleClearFilter}
      onClose={handleCloseModal}
      positionHorizontal="center"
      positionVertical="center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do evento ${item?.cds_agrupa_evento || ''}`}
      maxHeight={'28rem'}
    >
      <ModalContent>
        <DivGroup>
          <TextGroup>Eventos</TextGroup>
          <RadioGroup
            options={optionsOficial}
            selectedOption={filter.oficial}
            setSelectedOption={(options) => {
              setFilter((prev) => ({
                ...prev,
                oficial: options,
              }));
            }}
          />
        </DivGroup>

        <DivGroup>
          <TextGroup>Data</TextGroup>

          <Dropdown
            maxHeight="96px"
            variant="tertiary"
            label="Ano"
            data={years}
            value={filter.year}
            setValue={(item) => {
              setFilter((prev) => {
                return { ...prev, year: item };
              });
            }}
          />

          <Dropdown
            maxHeight="96px"
            variant="tertiary"
            label="Meses"
            data={months}
            value={filter.month}
            setValue={(item) => {
              setFilter((prev) => {
                return { ...prev, month: item };
              });
            }}
          />
        </DivGroup>

        <DivButton>
          <Button size="md" text="Aplicar" variant="dark" onClick={handleApplyFilter} />
        </DivButton>
      </ModalContent>
    </Modal>
  );
};
