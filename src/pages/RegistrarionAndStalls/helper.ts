export const getClassDValueToSort = (cds_classificacao_d: string | undefined) => {
  if (!cds_classificacao_d) return 99999;
  const [group, pos] = cds_classificacao_d.split('-').map((s) => s.trim());
  // Extrai o número do grupo, ex: "1D" => 1
  const groupNum = parseInt(group, 10);
  const posNum = parseInt(pos, 10);
  // Ordena por grupo e depois por posição, ex: 1D-10 vira 10010, 2D-1 vira 20001
  if (isNaN(groupNum) || isNaN(posNum)) return 99999;
  return groupNum * 10000 + posNum;
};