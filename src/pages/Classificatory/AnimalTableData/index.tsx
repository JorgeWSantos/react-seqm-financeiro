import { Text } from '@abqm-ds/react';
import {
  ContainerImage,
  DivImage,
  DivInfo,
  DivTexts,
  LaurelImage,
  StyledTextHallOfFame,
} from './styles';
import { colors } from '@abqm-ds/tokens';
import LaurelImg from './laurel.svg';
import MedalImg from './medal.svg';

interface AnimalTableDataProps {
  nameAnimal: string;
  imgAnimal: string;
  isHallOfFame: boolean;
}

const AnimalTableData = ({
  nameAnimal,
  imgAnimal,
  isHallOfFame,
}: AnimalTableDataProps) => {
  return (
    <ContainerImage>
      <DivImage>
        <div className="image-bg" />
        <img src={imgAnimal} />
        {isHallOfFame && <LaurelImage src={LaurelImg} />}
      </DivImage>

      <DivInfo>
        <DivTexts>
          <Text fontSize="xxs" fontWeight="semiBold" color={colors.brown700}>
            {nameAnimal}
          </Text>
          <StyledTextHallOfFame>HALL DA FAMA 2017</StyledTextHallOfFame>
        </DivTexts>
        <img src={MedalImg} width={14} height={14} />
      </DivInfo>
    </ContainerImage>
  );
};

export default AnimalTableData;
