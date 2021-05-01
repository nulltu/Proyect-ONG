import React from 'react';
import { useSelector } from 'react-redux';
import ListAboutUs from './ListAboutUs';

const AboutUs = () => {
  const maxWidth = window.screen.width;
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '80vh' }}>
        <div className="col-lg-12" style={{ margin: ' 0 auto' }}>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            Contenido
          </h1>
          <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
            <ListAboutUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
