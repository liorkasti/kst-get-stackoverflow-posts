import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

import App from './App';
import { ThemeProvider } from './utils/ThemeContext';

export default () => {

  useEffect(() => {
    setTimeout(() => {
      Orientation.lockToPortrait();
    });
  }, []);

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};