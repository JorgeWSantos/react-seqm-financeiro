import {
  Button,
  Dropdown,
  Modal,
  RadioGroup,
  type RadioGroupOption,
} from '@abqm-ds/react';
import { DivButton, DivGroup, ModalContent, TextGroup } from './styles';
import { useState } from 'react';

interface ModalFilterProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  item: any | null;
}

export const ModalFilter = ({
  handleCloseModal,
  isModalOpen,
  item,
}: ModalFilterProps) => {
  const options = [
    { label: 'Todos', value: 'todos', id: 'todos' },
    { label: 'Oficiais', value: 'oficiais', id: 'oficiais' },
    { label: 'Oficializados', value: 'oficializados', id: 'oficializados' },
  ];

  const [selectedOption, setSelectedOption] = useState<RadioGroupOption>(options[0]);

  return (
    <Modal
      title="Filtro"
      isFiltered={true}
      isOpen={isModalOpen}
      onClickCleanFilter={() => console.log('Limpar filtro')}
      onClose={handleCloseModal}
      positionHorizontal="center"
      positionVertical="center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do evento ${item?.cds_agrupa_evento || ''}`}
      maxHeight={'48vh'}
    >
      <ModalContent>
        <DivGroup>
          <TextGroup>Eventos</TextGroup>
          <RadioGroup
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </DivGroup>

        <DivGroup>
          <TextGroup>Data</TextGroup>

          <Dropdown
            maxHeight="96px"
            variant="tertiary"
            label="Ano"
            data={[
              { value: '1', label: 'Opção 1', id: '1' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
            ]}
          />

          <Dropdown
            maxHeight="96px"
            variant="tertiary"
            label="Meses"
            data={[
              { value: '1', label: 'Opção 1', id: '1' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
              { value: '2', label: 'Opção 2', id: '2' },
            ]}
          />
        </DivGroup>

        <DivButton>
          <Button size="md" text="Aplicar" variant="dark" />
        </DivButton>
      </ModalContent>
    </Modal>
  );
};
