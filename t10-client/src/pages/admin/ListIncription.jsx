import React from 'react';
import { useSelector } from 'react-redux';
import ListAllAdminInscriptions from '../../components/ListAllAdminInscription';

const ListInscriptions = () => {
  const maxWidth = window.screen.width;
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div className="container" style={{ minHeight: '80vh' }}>
      <div className="row align-items-center" style={{ minHeight: '75vh' }}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            Inscripciones
          </h1>
          <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
            <ListAllAdminInscriptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListInscriptions;
