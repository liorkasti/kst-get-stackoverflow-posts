import React from 'react';
import Orientation from 'react-native-orientation-locker';

import App from './App';
import { ThemeProvider } from './utils/ThemeContext';

export default () => {
  setTimeout(() => {
    Orientation.lockToPortrait();
  });
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};