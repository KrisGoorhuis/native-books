import React from 'react'
import { View, Modal, Animated } from 'react-native'
import BookCard from './BookCard'
import useLoadBookData from '../../hooks/useLoadBookData'
import { BookData } from '../../model/BookData'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { Spinner } from '@ui-kitten/components'
import BookModal from './BookModal'

export default function BookScroll() {
   const data = useLoadBookData()
   const [selectedBookData, setSelectedBookData] = React.useState<BookData | null>(null)
   const [modalVisible, setModalVisible] = React.useState<boolean>(false)
   const [xPos, setXPos] = React.useState<any>(new Animated.Value(0))

   const modalWidth = 500

   if (!data) {
      return <Spinner />
   }

   if (data.bookData) {
      // console.log(data.bookData.length)
   }


   const slideOpen = () => {
      console.log("sliding")
      Animated.spring(xPos, {
         toValue: new Animated.Value(modalWidth),
         useNativeDriver: true,

       }).start(({ finished }) => {
         console.log("finished start")
        setModalVisible(false)
      })
   }

   const slideClosed = () => {
      Animated.spring(xPos, {
         toValue: new Animated.Value(0),
         useNativeDriver: true,
       }).start(({ finished }) => {
          console.log("finished")
         setModalVisible(false)
       })
   }



   const handleBookModalOpen = (data: BookData) => {
      setSelectedBookData(data)
      setModalVisible(true)
      slideOpen()
      setTimeout(() => {
         slideClosed()
      }, 1000)


   }


   const slideAnim = React.useRef(new Animated.Value(0)).current



   return (
      <View>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContainer}>
               {
                  data.bookData &&
                  data.bookData.map((bookData: BookData, i: number) => {
                     return <BookCard
                        onPress={handleBookModalOpen}
                        key={i}
                        data={bookData}
                     />
                  })
               }
            </View>
         </ScrollView>

         <Animated.View
            style={{translateX: xPos}}
         >
            {
               selectedBookData && modalVisible &&
               <BookModal data={selectedBookData} />
            }
         </Animated.View>

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
});