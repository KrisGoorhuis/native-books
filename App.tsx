import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { KEY } from '@env'


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  console.log("process.env.KEY")
  console.log(process.env.KEY)
  console.log(process.env['KEY'])
  console.log(process.env['KEY'])


  console.log("KEY")
  console.log(KEY)

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
