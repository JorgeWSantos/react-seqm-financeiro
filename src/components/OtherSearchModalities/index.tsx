import mapSvgByModality from '@src/utils/mapSvgToModality';
import RoundedButtonModalitie from '../DivButtonModality';
import { Container, ContentModalities, HeadingModalities } from './styles';
import type { Modality } from '@src/pages/Main/types';

interface OtherSearchModalitiesProps {
  title: string;
  data: Modality[];
}

const OtherSearchModalities = ({ title, data }: OtherSearchModalitiesProps) => {
  return (
    <Container>
      <HeadingModalities>{title}</HeadingModalities>
      <ContentModalities>
        {data.map((item) => (
          <RoundedButtonModalitie
            key={item.nid_prova}
            variant="secondary"
            icon={mapSvgByModality[item.nid_prova]}
            text={item.cds_tipo_prova}
          />
        ))}
      </ContentModalities>
    </Container>
  );
};

export default OtherSearchModalities;
