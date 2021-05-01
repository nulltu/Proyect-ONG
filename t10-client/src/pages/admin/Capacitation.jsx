import React from 'react';
import { useSelector } from 'react-redux';
import ListAdminCourse from '../../components/ListAdminCourse';

const Capacitation = () => {
  const maxWidth = window.screen.width;
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h1 className="text-center" style={{ color: theme.lettersColor }}>
        Capacitaciones
      </h1>
      <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
        <ListAdminCourse />
      </div>
    </div>
  );
};
export default Capacitation;
