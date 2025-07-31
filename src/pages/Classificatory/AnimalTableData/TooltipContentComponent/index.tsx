import { colors } from '@abqm-ds/tokens';
import { TooltipContent, TooltipContentRight } from './styles';
import { Text } from '@abqm-ds/react';
import type { SVGProps, JSX } from 'react';

const TooltipContentComponent = ({
  ImgAnimal,
}: {
  ImgAnimal?: string | React.FC<SVGProps<SVGSVGElement>> | ((props: any) => JSX.Element);
}) => (
  <TooltipContent>
    {typeof ImgAnimal === 'string' ? (
      <img src={ImgAnimal} />
    ) : typeof ImgAnimal === 'function' ? (
      <ImgAnimal />
    ) : null}

    <TooltipContentRight>
      <Text fontSize="xxs" color={colors.emeraldGreen75}>
        Conquistas do animal
      </Text>
    </TooltipContentRight>
  </TooltipContent>
);

export default TooltipContentComponent;
