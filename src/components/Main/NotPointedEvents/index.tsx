import { ButtonNotPointed, Container, TextNotPointed } from './styles';

interface NotPointedEventsProps {
  onClick: ({
    id_prova,
    cds_tipo_prova,
  }: {
    id_prova: string;
    cds_tipo_prova: string;
  }) => void;
}

const NotPointedEvents = ({ onClick }: NotPointedEventsProps) => {
  return (
    <Container>
      <ButtonNotPointed
        onClick={() =>
          onClick({ cds_tipo_prova: 'Eventos Não Pontuados', id_prova: 'nao-pontuados' })
        }
      >
        <TextNotPointed>
          EVENTOS <span>não pontuados</span>
        </TextNotPointed>
      </ButtonNotPointed>
    </Container>
  );
};

export default NotPointedEvents;
