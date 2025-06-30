import RoundedButtonModalitie from '../RoundedButtonModalitie';
import { Container, ContentModalities, HeadingModalities } from './styles';
import ranchingSortingSVG from '@assets/svgs/ranching-sorting.svg';
import tresTamboresSVG from '@assets/svgs/tres-tambores.svg';
import teamPenningSVG from '@assets/svgs/team-penning.svg';
import vaquejadaSVG from '@assets/svgs/vaquejada.svg';
import seisBalizasSVG from '@assets/svgs/seis-balizas.svg';
import redeasSVG from '@assets/svgs/redeas.svg';
import lacoComprido from '@assets/svgs/laco-comprido.svg';

const MoreSearchedModalities = () => {
  const icons = [
    '',
    ranchingSortingSVG,
    tresTamboresSVG,
    teamPenningSVG,
    vaquejadaSVG,
    seisBalizasSVG,
    redeasSVG,
    lacoComprido,
  ];

  const data = [
    { id_prova: 1, nome_modalidade: 'RANCH SORTING' },
    { id_prova: 2, nome_modalidade: 'TRÊS TAMBORES' },
    { id_prova: 3, nome_modalidade: 'TEAM PENNING' },
    { id_prova: 4, nome_modalidade: 'VAQUEJADA' },
    { id_prova: 5, nome_modalidade: 'SEIS BALIZAS' },
    { id_prova: 6, nome_modalidade: 'RÉDEAS' },
    { id_prova: 7, nome_modalidade: 'LAÇO COMPRIDO' },
  ];

  return (
    <Container>
      <HeadingModalities>MODALIDADES MAIS BUSCADAS</HeadingModalities>
      <ContentModalities>
        {data.map((item) => (
          <RoundedButtonModalitie
            key={item.id_prova}
            icon={icons[item.id_prova]}
            text={item.nome_modalidade}
          />
        ))}
      </ContentModalities>
    </Container>
  );
};

export default MoreSearchedModalities;
