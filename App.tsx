import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './redux/index'
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = React.useState<boolean>(false)

  
  React.useEffect(() => {
    _loadFontsAsync();
  })

  
  const fonts = {
    // 'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
    ...MaterialCommunityIcons.font
  };

  async function _loadFontsAsync() {
    await Font.loadAsync(fonts);
    setFontsLoaded(true)
  }


  if (!fontsLoaded || !isLoadingComplete) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView />
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }
}
