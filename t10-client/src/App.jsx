import React from 'react';
import { useSelector } from 'react-redux';
import Routes from './router';

function App() {
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  return (
    <div style={{ backgroundColor: theme.backgroundColor }}>
      <Routes />
    </div>
  );
}

export default App;
