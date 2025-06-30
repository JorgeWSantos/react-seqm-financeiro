import {
  Container,
  ContentModalities,
  DivModalitie,
  HeadingModalities,
  ImageModalitie,
  RoundedButton,
  StyledText,
} from './styles';
import ranchingSortingSVG from '@assets/svgs/ranching-sorting.svg';

const MoreSearchedModalities = () => {
  return (
    <Container>
      <HeadingModalities>MODALIDADES MAIS BUSCADAS</HeadingModalities>
      <ContentModalities>
        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>

        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>

        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>

        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>

        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>

        <DivModalitie>
          <RoundedButton>
            <ImageModalitie src={ranchingSortingSVG} alt="Ranch Sorting" />
          </RoundedButton>

          <StyledText>RANCH SORTING</StyledText>
        </DivModalitie>
      </ContentModalities>
      {/* <ButtonNotPointed>
      </ButtonNotPointed> */}
    </Container>
  );
};

export default MoreSearchedModalities;
