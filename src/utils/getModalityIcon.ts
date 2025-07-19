import {
  TresTamboresIconSEQM,
  ApartacaoIconSEQM,
  VaquejadaIconSEQM,
  RedeasIconSEQM,
  WesternPleasureIconSEQM,
  WorkingCowHorseIconSEQM,
  LacoIndividualIconSEQM,
  LacoEmDuplaIconSEQM,
  LacoPeIconSEQM,
  LacoCabecaIconSEQM,
  CincoTamboresIconSEQM,
  SeisBalizasIconSEQM,
  ManeabilidadeEVelocidadeIconSEQM,
  BulldogIconSEQM,
  TeamPenningIconSEQM,
  LacoCompridoTecnicoIconSEQM,
  ConformacaoIconSEQM,
  LacoIndividualTecnicoIconSEQM,
  RanchSortingIconSEQM,
  PerformanceHalterIconSEQM,
  BreakawayRopingIconSEQM,
  LacoCompridoIconSEQM,
  // CorridaIconSEQM, // descomente se existir
} from '@abqm-ds/icons';

export function getModalityIcon(nid_prova: number) {
  // TODO: falta o ícone CorridaIconSEQM, descomente se existir

  switch (nid_prova) {
    case 11:
      return TresTamboresIconSEQM;
    case 18:
      return VaquejadaIconSEQM;
    case 1:
      return ApartacaoIconSEQM;
    case 2:
      return RedeasIconSEQM;
    case 3:
      return WesternPleasureIconSEQM;
    case 4:
      return WorkingCowHorseIconSEQM;
    case 7:
      return LacoIndividualIconSEQM;
    case 8:
      return LacoEmDuplaIconSEQM;
    case 9:
      return LacoPeIconSEQM;
    case 10:
      return LacoCabecaIconSEQM;
    case 12:
      return CincoTamboresIconSEQM;
    case 13:
      return SeisBalizasIconSEQM;
    case 14:
      return ManeabilidadeEVelocidadeIconSEQM;
    case 15:
      return BulldogIconSEQM;
    case 16:
      return TeamPenningIconSEQM;
    case 17:
      return LacoCompridoTecnicoIconSEQM;
    case 20:
      return ConformacaoIconSEQM;
    case 22:
      return LacoIndividualTecnicoIconSEQM;
    case 23:
      return RanchSortingIconSEQM;
    case 24:
      return PerformanceHalterIconSEQM;
    case 25:
      return BreakawayRopingIconSEQM;
    case 30:
      return LacoCompridoIconSEQM;
    case 48:
      return undefined; // CorridaIconSEQM se existir
    default:
      return undefined;
  }
}
