import { formatToBRL, InfoCard } from '@abqm-ds/react';
import { GroupCards, ItemCardGroup } from './styles';
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
  premiation_value: string | null;
  dt_prove: string | null;
}) => {
  return (
    <ItemCardGroup>
      <GroupCards>
        <InfoCard title="inscrições" subTitle={qtde_inscriptions} />
        <InfoCard title="competidores" subTitle={qtde_competitors} />
        <InfoCard title="animais" subTitle={qtde_animals} />
      </GroupCards>

      <GroupCards>
        {premiation_value && (
          <InfoCard
            title="premiação"
            subTitle={formatToBRL({
              value: premiation_value,
              fallback: '-',
            })}
            reverse
          />
        )}

        {dt_prove && (
          <InfoCard
            title="data da prova"
            subTitle={convertToBrazilDate(dt_prove || '') || '-'}
            reverse
          />
        )}
      </GroupCards>
    </ItemCardGroup>
  );
};

export { InfoCardsGroup };
