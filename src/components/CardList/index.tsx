import { CardListContainer, StyledText } from './styles';

interface CardListProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  isEven: boolean;
}

const CardList = ({ value, isEven, ...rest }: CardListProps) => {
  return (
    <CardListContainer $isEven={isEven} {...rest}>
      <StyledText>{value}</StyledText>
    </CardListContainer>
  );
};

export { CardList };
