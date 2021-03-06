import * as React from 'react'
import { StyleSheet } from 'react-native'

import Library from '../components/Library'
import { View } from '../components/Themed'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Library />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
