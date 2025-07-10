import { Text } from '@abqm-ds/react';
import { ContainerRadio, ContentRadio } from './styles';

// Novo componente reutilizável para o grupo de radio buttons de filtro
const RadioGroup = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}) => (
  <ContainerRadio>
    <Text>Filtrar por:</Text>

    <ContentRadio>
      <label className="custom-radio">
        <input type="radio" name="option" />
        <span className="radio-mark"></span>
        Opção 1
      </label>
      <label className="custom-radio">
        <input type="radio" name="option" />
        <span className="radio-mark"></span>
        Opção 2
      </label>

      {/* <label>
        <input
          className="custom-radio"
          type="radio"
          name="filter"
          value="abertos"
          checked={selectedOption === 'abertos'}
          onChange={() => setSelectedOption('abertos')}
        />
        Abertos
      </label>

      <label>
        <input
          className="custom-radio"
          type="radio"
          name="filter"
          value="encerrados"
          checked={selectedOption === 'encerrados'}
          onChange={() => setSelectedOption('encerrados')}
        />
        Encerrados
      </label> */}
    </ContentRadio>
  </ContainerRadio>
);

export { RadioGroup };
