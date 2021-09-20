import React from 'react'
import { View, Text } from 'react-native'
import BookCard from './BookCard'
import useLoadBookData from '../../hooks/useLoadBookData'
import { BookData } from '../../model/BookData'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'


export default function BookScroll() {
   const data = useLoadBookData()

   if (!data) {
      return <Text>Loading spinner!</Text>
   }

   if (data.bookData) {
      // console.log(data.bookData.length)
   }

   return (
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.scrollContainer}>
            {
               data.bookData &&
               data.bookData.map((bookData: BookData, i: number) => {
                  return <BookCard key={i} data={bookData} />
               })
            }
         </View>
      </ScrollView>
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
 });