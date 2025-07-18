import React from 'react';
import SVG from './logo-seqm.svg';

const PrintArea: React.FC = () => {
  return (
    <div
      id="print-area"
      style={{
        position: 'absolute',
        left: '200px',
        padding: '20pt',
        textAlign: 'center',
        width: '210mm',
        height: '297mm',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          width: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '8px' }}>
          <img src={SVG} width={'170px'} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            paddingLeft: '8px',
            minHeight: '60pt',
          }}
        >
          <p style={{ fontSize: '13pt', fontWeight: 'bold' }}>NOME DO EVENTO</p>
          <p>Este é um exemplo de tela de impressão simples.</p>
        </div>
      </div>
    </div>
  );
};

export default PrintArea;
