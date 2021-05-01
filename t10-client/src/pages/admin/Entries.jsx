import React from 'react';
import { useSelector } from 'react-redux';
import ListActivities from '../../components/ListActivities';

const Entries = () => {
  const maxWidth = window.screen.width;

  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '70vh' }}>
        <div style={{ width: '80%', margin: ' 0 auto' }}>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            Entradas
          </h1>
          <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
            <ListActivities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
