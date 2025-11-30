import { formatToBRL, InfoCard } from '@abqm-ds/react';
import { GroupCards, ItemCardGroup } from './styles';

const InfoCardsGroup = ({
  qtd_inscriptions,
  qtd_stalls,
  sum_stalls,
  sum_all,
  sum_inscriptions,
}: {
  qtd_inscriptions: number;
  qtd_stalls: number;
  sum_stalls: number;
  sum_all: number;
  sum_inscriptions: number;
}) => {
  return (
    <ItemCardGroup>
      <GroupCards>
        <InfoCard title="inscrições" subTitle={qtd_inscriptions.toString()} />
        <InfoCard title="baias" subTitle={qtd_stalls.toString()} />
      </GroupCards>

      <GroupCards>
        <InfoCard
          title="inscrições"
          subTitle={formatToBRL({
            value: sum_inscriptions,
            fallback: '-',
          })}
          reverse
        />
        <InfoCard
          title="baias"
          subTitle={formatToBRL({
            value: sum_stalls,
            fallback: '-',
          })}
          reverse
        />
        <InfoCard
          title="total geral"
          subTitle={formatToBRL({
            value: sum_all,
            fallback: '-',
          })}
          reverse
        />
      </GroupCards>
    </ItemCardGroup>
  );
};

export { InfoCardsGroup };
