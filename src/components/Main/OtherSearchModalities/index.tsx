import type { ResultModalities } from '@src/pages/Main/types.api';
import RoundedButtonModalitie from '../DivButtonModality';
import { Container, ContentModalities, HeadingModalities } from './styles';
import { getModalityIcon } from '@src/utils/getModalityIcon';

interface OtherSearchModalitiesProps {
  title: string;
  data: ResultModalities[];
  onClick: ({ id_prova }: { id_prova: number }) => void;
}

const OtherSearchModalities = ({ title, data, onClick }: OtherSearchModalitiesProps) => {
  return (
    <Container>
      <HeadingModalities>{title}</HeadingModalities>
      <ContentModalities>
        {data.map((item) => {
          const Icon = getModalityIcon(item.nid_prova);

          return (
            <RoundedButtonModalitie
              key={item.nid_prova}
              variant="secondary"
              icon={Icon ? <Icon /> : <span />}
              text={item.cds_tipo_prova}
              onClick={() => onClick({ id_prova: item.nid_prova })}
            />
          );
        })}
      </ContentModalities>
    </Container>
  );
};

export default OtherSearchModalities;
