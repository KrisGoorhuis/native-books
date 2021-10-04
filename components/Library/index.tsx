import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { State } from '../../redux'
import BookScroll from '../BookScroll/BookScroll'


export default function Library() {
   const bookLibrary = useSelector((state: State) => state.library.library)

   const handleBookModalOpen = () => {

   }

   return (
      <View>
         <BookScroll data={bookLibrary} handleBookModalOpen={handleBookModalOpen} />

      </View>
   )
}

const styles = StyleSheet.create({

})