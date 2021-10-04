import * as React from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import Explore from '../components/BookScroll';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'Explore'>) {
  
  return (
    <View style={styles.container}>
      <Explore />
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
