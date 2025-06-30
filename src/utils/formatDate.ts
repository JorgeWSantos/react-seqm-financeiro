export const formatDateToShowOnCard = ({ date }: { date: string }) => {
  // const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  const months: { [key: string]: string } = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
  };

  return `${day} ${months[month]}`;
};

export const convertToBrazilDate = (dataToParse: string) => {
  // Cria um objeto Date a partir da string ISO
  const data = new Date(dataToParse);

  // Extrai o dia, mês e ano
  const dia = String(data.getDate()).padStart(2, '0'); // Garantir dois dígitos
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
  const ano = data.getFullYear();

  // Retorna a data no formato brasileiro (DD/MM/AAAA)
  return `${dia}/${mes}/${ano}`;
};
