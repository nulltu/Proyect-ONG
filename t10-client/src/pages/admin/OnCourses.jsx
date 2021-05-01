import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListAdminOnCourse from '../../components/ListAdminOncourse';

const onCourses = () => {
  const maxWidth = window.screen.width;
  const { id } = useLocation().state;
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '80vh' }}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            Cursadas
          </h1>
          <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
            <ListAdminOnCourse id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default onCourses;
