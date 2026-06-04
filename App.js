import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/rootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}