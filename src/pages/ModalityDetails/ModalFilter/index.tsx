import { Modal, Text, useDeviceType } from '@abqm-ds/react';
import {
  ButtonFolder,
  DivInfos,
  ModalContent,
  TextInfosDates,
  TextDivInfosTop,
  TextInfosDatesTop,
} from './styles';
import { convertToBrazilDate } from '@src/utils/formatDate';
import { colors } from '@abqm-ds/tokens';
import { FileTextIcon } from '@abqm-ds/icons';

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
        <DivInfos>
          <TextDivInfosTop>{item?.cds_local_evento}</TextDivInfosTop>

          <Text
            fontSize="lgg"
            fontWeight="regular"
            color={colors.black75}
            style={{ textAlign: 'center', lineHeight: '1.625rem' }}
          >
            {item?.cnm_cidade}, {item?.cnm_estado}
          </Text>
        </DivInfos>

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
