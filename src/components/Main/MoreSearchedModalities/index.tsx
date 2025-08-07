// import mapSvgByModality from '@src/utils/mapSvgToModality2';
import type { ResultModalities } from '@src/services/Main/types.api';
import RoundedButtonModalitie from '../DivButtonModality';
import { Container, ContentModalities, HeadingModalities } from './styles';
import { getModalityIcon } from '@abqm-ds/react';

interface MoreSearchedModalitiesProps {
  title: string;
  data: ResultModalities[];
  onClick: ({
    id_prova,
    cds_tipo_prova,
  }: {
    id_prova: number;
    cds_tipo_prova: string;
  }) => void;
}

const MoreSearchedModalities = ({
  title,
  data,
  onClick,
}: MoreSearchedModalitiesProps) => {
  return (
    <Container>
      <HeadingModalities>{title}</HeadingModalities>
      <ContentModalities>
        {data.map((item) => {
          const Icon = getModalityIcon(item.nid_prova);
          return (
            <RoundedButtonModalitie
              key={item.nid_prova}
              icon={Icon ? <Icon /> : <span />}
              text={item.cds_tipo_prova}
              onClick={() =>
                onClick({ id_prova: item.nid_prova, cds_tipo_prova: item.cds_tipo_prova })
              }
            />
          );
        })}
      </ContentModalities>
    </Container>
  );
};

export default MoreSearchedModalities;
