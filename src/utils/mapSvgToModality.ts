import tresTamboresSVG from '@assets/svgs/tres-tambores.svg';
import apartacaoSVG from '@assets/svgs/apartacao.svg';
import vaquejadaSVG from '@assets/svgs/vaquejada.svg';
import redeasSVG from '@assets/svgs/redeas.svg';
import westernPleasureSVG from '@assets/svgs/western-pleasure.svg';
import workingCowHorseSVG from '@assets/svgs/working-cow-horse.svg';
import lacoIndividualSVG from '@assets/svgs/laco-individual.svg';
import lacoEmDuplaSVG from '@assets/svgs/laco-em-dupla.svg';
import lacoPeSVG from '@assets/svgs/laco-pe.svg';
import lacoCabecaSVG from '@assets/svgs/laco-cabeca.svg';
import cincoTamboresSVG from '@assets/svgs/cinco-tambores.svg';
import seisBalizasSVG from '@assets/svgs/seis-balizas.svg';
import maneabilidadeEVelociadeSVG from '@assets/svgs/maneabilidade-e-velocidade.svg';
import bulldogSVG from '@assets/svgs/bulldog.svg';
import teamPenningSVG from '@assets/svgs/team-penning.svg';
import lacoCompridoTecnicoSVG from '@assets/svgs/laco-comprido-tecnico.svg';
import conformacaoSVG from '@assets/svgs/conformacao.svg';
import lacoIndividualTecnicoSVG from '@assets/svgs/laco-individual-tecnico.svg';
import ranchSortingSVG from '@assets/svgs/ranch-sorting.svg';
import performanceHalterSVG from '@assets/svgs/performance-halter.svg';
import breakawayRopingSVG from '@assets/svgs/breakaway-roping.svg';
import lacoCompridoSVG from '@assets/svgs/laco-comprido.svg';
// import corridaSvg from '@assets/svgs/corrida.svg';

const mapSvgByModality: { [key: number]: string } = {
  11: tresTamboresSVG,
  18: vaquejadaSVG,
  1: apartacaoSVG,
  2: redeasSVG,
  3: westernPleasureSVG,
  4: workingCowHorseSVG,
  7: lacoIndividualSVG,
  8: lacoEmDuplaSVG,
  9: lacoPeSVG,
  10: lacoCabecaSVG,
  12: cincoTamboresSVG,
  13: seisBalizasSVG,
  14: maneabilidadeEVelociadeSVG,
  15: bulldogSVG,
  16: teamPenningSVG,
  17: lacoCompridoTecnicoSVG,
  20: conformacaoSVG,
  22: lacoIndividualTecnicoSVG,
  23: ranchSortingSVG,
  24: performanceHalterSVG,
  25: breakawayRopingSVG,
  30: lacoCompridoSVG,
  48: tresTamboresSVG, //corridaSvg,
};

export default mapSvgByModality;
