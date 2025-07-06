import RoundedButtonModalitie from '../DivButtonModality';
import { Container, ContentModalities, HeadingModalities } from './styles';
import type { Modality } from '@src/pages/Main/types';
import { getModalityIcon } from '@src/utils/getModalityIcon';

interface OtherSearchModalitiesProps {
  title: string;
  data: Modality[];
}

const OtherSearchModalities = ({ title, data }: OtherSearchModalitiesProps) => {
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
            />
          );
        })}
      </ContentModalities>
    </Container>
  );
};

export default OtherSearchModalities;
