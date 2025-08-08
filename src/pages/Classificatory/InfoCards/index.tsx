import { formatToBRL, InfoCard } from '@abqm-ds/react';
import { ItemCardGroup } from './styles';
import { convertToBrazilDate } from '@src/utils/formatDate';

const InfoCardsGroup = ({
  qtde_inscriptions,
  qtde_competitors,
  qtde_animals,
  premiation_value,
  dt_prove,
}: {
  qtde_inscriptions: string;
  qtde_competitors: string;
  qtde_animals: string;
  premiation_value: string;
  dt_prove: string;
}) => {
  return (
    <ItemCardGroup>
      <InfoCard title="inscrições" subTitle={qtde_inscriptions} />

      <InfoCard title="competidores" subTitle={qtde_competitors} />

      <InfoCard title="animais" subTitle={qtde_animals} />

      <InfoCard
        title="premiação"
        subTitle={formatToBRL({
          value: premiation_value,
          fallback: '-',
        })}
        reverse
      />

      <InfoCard
        title="data da prova"
        subTitle={convertToBrazilDate(dt_prove || '') || '-'}
        reverse
      />
    </ItemCardGroup>
  );
};

export { InfoCardsGroup };
