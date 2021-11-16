/**
 * @format
 */
 import { AppRegistry } from 'react-native';
 import AppRender from './src/AppContext';
 import { name as appName } from './app.json';
 
 AppRegistry.registerComponent(appName, () => AppRender);
 