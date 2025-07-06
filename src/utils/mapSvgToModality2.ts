import {
  ApartacaoIconSEQM,
  TresTamboresIconSEQM,
  VaquejadaIconSEQM,
} from '@abqm-ds/icons';

const mapSvgByModality: {
  [key: number]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  11: TresTamboresIconSEQM,
  18: VaquejadaIconSEQM,
  1: ApartacaoIconSEQM,
  // 2: redeasSVG,
  // 3: westernPleasureSVG,
  // 4: workingCowHorseSVG,
  // 7: lacoIndividualSVG,
  // 8: lacoEmDuplaSVG,
  // 9: lacoPeSVG,
  // 10: lacoCabecaSVG,
  // 12: cincoTamboresSVG,
  // 13: seisBalizasSVG,
  // 14: maneabilidadeEVelociadeSVG,
  // 15: bulldogSVG,
  // 16: teamPenningSVG,
  // 17: lacoCompridoTecnicoSVG,
  // 20: conformacaoSVG,
  // 22: lacoIndividualTecnicoSVG,
  // 23: ranchSortingSVG,
  // 24: performanceHalterSVG,
  // 25: breakawayRopingSVG,
  // 30: lacoCompridoSVG,
  // 48: tresTamboresSVG, //corridaSvg,
};

export default mapSvgByModality;
