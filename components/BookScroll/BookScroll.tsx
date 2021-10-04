import React from 'react'
import { View, Modal, Animated, Dimensions } from 'react-native'
import BookCard from './BookCard'
import useLoadBookData from '../../hooks/useLoadBookData'
import { BookData } from '../../model/BookData'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import BookModal from './BookModal'


export default function BookScroll() {
   const data = useLoadBookData()
   const [selectedBookData, setSelectedBookData] = React.useState<BookData | null>(null)
   const [modalVisible, setModalVisible] = React.useState<boolean>(false)
   const [xPos, setXPos] = React.useState<any>(new Animated.Value(0))

   if (!data) {
      // return <Spinner />
   }

   if (data.bookData) {
      // console.log(data.bookData.length)
   }

   const myCallback = () => {
      console.log("Success!")
   }

   const slideOpen = () => {
      console.log("sliding")
      Animated.spring(xPos, {
         toValue: new Animated.Value(Dimensions.get('window').width),
         useNativeDriver: true,
      }).start(() => myCallback)
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
   }


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
            style={[
               styles.modalContainer,
               { transform: [{ translateX: xPos }] }
            ]}
            onTouchStart={slideClosed}
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
   modalContainer: {
      position: 'absolute',
      top: 100,
      left: Dimensions.get('window').width * -1,
      backgroundColor: 'white',
      width: '100%',
      height: "100%"
   }
});