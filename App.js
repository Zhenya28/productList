import React from 'react';
import HomeScreen from './HomeScreen';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
