import { ContentDektop, Header, Heading } from '@abqm-ds/react';
import { colors } from '@abqm-ds/tokens';
import { useRouteError } from 'react-router-dom';

export function ErrorElement() {
  const error = useRouteError() as any;

  return (
    <ContentDektop header={<Header text="Ocorreu um erro" />}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          color: '#222',
          padding: 0,
          fontFamily: 'Open Sans, Arial, sans-serif',
        }}
      >
        <Heading color={colors.emeraldGreen75}>
          Ops! Algo deu errado. {error?.data}
        </Heading>
      </div>
    </ContentDektop>
  );
}
