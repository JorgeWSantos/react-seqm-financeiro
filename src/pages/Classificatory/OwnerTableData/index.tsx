import {
  MedalImg,
  OwnerTableDataContainer,
  StyledSubTextHallOfFame,
  StyledTextHallOfFameOwner,
} from './styles';

import MedalSVG from './medal.svg';

const OwnerTableData = ({
  value,
  isHallOfFameOwner,
}: {
  value: string;
  isHallOfFameOwner: string | null;
}) => (
  <OwnerTableDataContainer>
    <StyledTextHallOfFameOwner $isHallOfFameOwner={!!isHallOfFameOwner}>
      {value}
      {isHallOfFameOwner && <MedalImg src={MedalSVG} />}
    </StyledTextHallOfFameOwner>

    {isHallOfFameOwner && (
      <StyledSubTextHallOfFame>HALL DA FAMA {isHallOfFameOwner}</StyledSubTextHallOfFame>
    )}
  </OwnerTableDataContainer>
);
export { OwnerTableData };
