import { ButtonNotPointed, Container, TextNotPointed } from './styles';

const NotPointedEvents = () => {
  return (
    <Container>
      <ButtonNotPointed>
        <TextNotPointed>
          EVENTOS <span>não pontuados</span>
        </TextNotPointed>
      </ButtonNotPointed>
    </Container>
  );
};

export default NotPointedEvents;
