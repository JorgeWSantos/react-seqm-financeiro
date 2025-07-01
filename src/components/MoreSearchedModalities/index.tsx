import mapSvgByModality from '@src/utils/mapSvgToModality';
import RoundedButtonModalitie from '../DivButtonModality';
import { Container, ContentModalities, HeadingModalities } from './styles';
import type { Modality } from '@src/pages/Main/types';

interface MoreSearchedModalitiesProps {
  title: string;
  data: Modality[];
}

const MoreSearchedModalities = ({ title, data }: MoreSearchedModalitiesProps) => {
  console.warn('TODO: validar ícone da corrida');

  console.log('MoreSearchedModalities data:', data);

  return (
    <Container>
      <HeadingModalities>{title}</HeadingModalities>
      <ContentModalities>
        {data.map((item) => (
          <RoundedButtonModalitie
            key={item.nid_prova}
            icon={mapSvgByModality[item.nid_prova]}
            text={item.cds_tipo_prova}
          />
        ))}
      </ContentModalities>
    </Container>
  );
};

export default MoreSearchedModalities;
