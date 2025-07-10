import { Modal, useDeviceType } from '@abqm-ds/react';
import {
  ButtonFolder,
  DivInfos,
  ModalContent,
  TextInfosDates,
  TextInfosDatesTop,
} from './styles';
import { convertToBrazilDate } from '@src/utils/formatDate';
import { FileTextIcon } from '@abqm-ds/icons';
import { useState } from 'react';
import { RadioGroup } from '../RadioGroup';

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
  const { isTabletOrMobile } = useDeviceType();
  const [selectedOption, setSelectedOption] = useState<string>('todos');

  return (
    <Modal
      title="Filtro"
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      positionHorizontal="center"
      positionVertical="center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do evento ${item?.cds_agrupa_evento || ''}`}
      maxHeight={isTabletOrMobile ? '80vh' : '66vh'}
    >
      <ModalContent>
        {/* Substituir bloco antigo pelo novo componente */}
        <RadioGroup
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <DivInfos>
          <TextInfosDatesTop>Data do Evento</TextInfosDatesTop>

          <TextInfosDates>
            de {item?.ddt_inicio_evento && convertToBrazilDate(item.ddt_inicio_evento)} a{' '}
            {item?.ddt_fim_evento && convertToBrazilDate(item.ddt_fim_evento)}
          </TextInfosDates>
        </DivInfos>

        <DivInfos>
          <TextInfosDatesTop>Período de Inscrições</TextInfosDatesTop>

          <TextInfosDates>
            de{' '}
            {item?.ddt_inicio_inscr_evento &&
              convertToBrazilDate(item.ddt_inicio_inscr_evento)}{' '}
            a{' '}
            {item?.ddt_fim_inscr_evento && convertToBrazilDate(item.ddt_fim_inscr_evento)}
          </TextInfosDates>
        </DivInfos>

        <ButtonFolder
          size="sm"
          iconLeft={<FileTextIcon width={16} height={16} />}
          text="Folder"
        />
      </ModalContent>
    </Modal>
  );
};
