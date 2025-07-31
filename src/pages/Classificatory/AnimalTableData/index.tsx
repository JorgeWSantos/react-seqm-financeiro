import {
  ContainerImage,
  DivBorder,
  DivImage,
  DivInfo,
  DivTexts,
  LaurelImage,
  MedalImg,
  StyledTextHallOfFame,
  StyledTextHallOfFameNameAnimal,
  StyledTooltip,
} from './styles';
import { colors } from '@abqm-ds/tokens';
import { DefaultHorseRoundedIconIMG, DefaultHorseSquadIconIMG } from '@abqm-ds/icons';
import TooltipContentComponent from './TooltipContentComponent';
import MedalSVG from './medal.svg';

interface AnimalTableDataProps {
  nameAnimal: string;
  imgAnimal?: string;
  isHallOfFameAnimal?: boolean;
  medal?: string;
  recordOfMerity?: string;
  modalityAwards?: string;
  allAroundAmateur?: string;
  allAroundYoung?: string;
  superHorseAward?: string;
  rankingGeralAward?: string;
}

const AnimalTableData = ({
  nameAnimal,
  imgAnimal,
  isHallOfFameAnimal,
  medal = '',
  recordOfMerity,
  modalityAwards,
  allAroundAmateur,
  allAroundYoung,
  superHorseAward,
  rankingGeralAward,
}: AnimalTableDataProps) => {
  const medalha: Record<string, string> = {
    '': 'transparent',
    'blue-medal': colors.blue500,
    'black-medal': colors.black,
    'brown-medal': colors.brown700,
    'gray-medal': colors.gray400,
    'green-medal': colors.green300,
    'red-medal': colors.red500,
    'yellow-medal': colors.yellow200,
  };

  const ImageSrc = imgAnimal !== '' ? imgAnimal : DefaultHorseRoundedIconIMG;
  const imageSrcTooltip = imgAnimal !== '' ? imgAnimal : DefaultHorseSquadIconIMG;

  const hasSomething = !!(
    medal ||
    isHallOfFameAnimal ||
    recordOfMerity ||
    modalityAwards ||
    allAroundAmateur ||
    allAroundYoung ||
    superHorseAward ||
    rankingGeralAward
  );

  return (
    <ContainerImage>
      <DivImage
        className="tooltip-anchor-divimage"
        data-tooltip-id={`tooltip-divimage-${nameAnimal}`}
      >
        <DivBorder $medalColor={isHallOfFameAnimal ? colors.yellow200 : medalha[medal]} />
        {typeof ImageSrc === 'string' ? (
          <img src={ImageSrc} />
        ) : ImageSrc ? (
          <ImageSrc className="image-animal-default" />
        ) : (
          <></>
        )}
      </DivImage>

      {isHallOfFameAnimal && (
        <LaurelImage
          className="tooltip-anchor-laurelimage"
          data-tooltip-id={`tooltip-laurelimage-${nameAnimal}`}
        />
      )}

      <DivInfo style={{ overflow: 'visible' }}>
        <DivTexts>
          <StyledTextHallOfFameNameAnimal>{nameAnimal}</StyledTextHallOfFameNameAnimal>

          {isHallOfFameAnimal && (
            <StyledTextHallOfFame>HALL DA FAMA 2017</StyledTextHallOfFame>
          )}
        </DivTexts>

        <MedalImg src={MedalSVG} />

        {/* Tooltip para DivImage */}
        <StyledTooltip
          id={
            isHallOfFameAnimal
              ? `tooltip-laurelimage-${nameAnimal}`
              : `tooltip-divimage-${nameAnimal}`
          }
          anchorSelect={
            isHallOfFameAnimal
              ? `.tooltip-anchor-laurelimage[data-tooltip-id='tooltip-laurelimage-${nameAnimal}']`
              : `.tooltip-anchor-divimage[data-tooltip-id='tooltip-divimage-${nameAnimal}']`
          }
          // openOnClick
          clickable
          place="top"
          positionStrategy="fixed"
          hasSomething={hasSomething}
          opacity={1}
          className="custom-tooltip" // Classe para estilizar
        >
          <TooltipContentComponent ImgAnimal={imageSrcTooltip} />
        </StyledTooltip>
      </DivInfo>
    </ContainerImage>
  );
};

export default AnimalTableData;
