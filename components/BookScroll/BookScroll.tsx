import React from 'react'
import { View, Dimensions } from 'react-native'
import BookCard from './BookCard'
import { BookData } from '../../model/BookData'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'


interface BookScrollProps {
   data: BookData[]
   handleBookModalOpen: (data: BookData) => void
}

export default function BookScroll(props: BookScrollProps) {

   return (
      <View>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContainer}>
               {
                  props.data.map((bookData: BookData, i: number) => {
                     return <BookCard
                        onPress={props.handleBookModalOpen}
                        key={i}
                        data={bookData}
                     />
                  })
               }
            </View>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   scrollContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
   },
   modalContainer: {
      position: 'absolute',
      // top: 100,
      left: Dimensions.get('window').width * -1,
      backgroundColor: 'white',
      width: '100%',
      height: "100%"
   }
});