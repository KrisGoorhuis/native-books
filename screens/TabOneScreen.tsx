import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import BookScroll from '../components/BookScroll/BookScroll'
import { Appbar } from 'react-native-paper';
import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { AppBar } from '@material-ui/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [search, setSearch] = React.useState<string>("")

  const updateSearch = () => {
    
  }

  const handleSearch = () => {
    
  }
  
  const _handleMore = () => {
    
  }

//   <Appbar.Header>
//   {/* <Appbar.BackAction onPress={_goBack} /> */}
//   <Appbar.Content title="Title" subtitle="Subtitle" />
//   <Appbar.Action icon="magnify" onPress={handleSearch} />
//   <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
// </Appbar.Header>

  
  return (
    <View style={styles.container}>
      
    
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
