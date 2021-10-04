import React from 'react'
import { View, Animated, Dimensions } from 'react-native'
import useLoadBookData from '../../hooks/useLoadBookData'
import { BookData } from '../../model/BookData'
import { StyleSheet } from 'react-native';
import BookModal from './BookModal'
import BookScroll from './BookScroll'



const xPos = new Animated.Value(0) // Outside component because state updating futzes with the animation

export default function Explore() {
   const data = useLoadBookData()
   const [selectedBookData, setSelectedBookData] = React.useState<BookData | null>(null)
   const [modalVisible, setModalVisible] = React.useState<boolean>(false)

   if (!data) {
      // return <Spinner />
   }

   if (data.bookData) {
      // console.log(data.bookData.length)
   }

   const slideOpen = () => {
      Animated.spring(xPos, {
         toValue: new Animated.Value(Dimensions.get('window').width),
         useNativeDriver: true,
      }).start(() => {})
   }

   const slideClosed = () => {
      Animated.spring(xPos, {
         toValue: new Animated.Value(0),
         useNativeDriver: true,
      }).start(() => {})
   }

   const handleBookModalOpen = (data: BookData) => {
      setSelectedBookData(data)
      setModalVisible(true)
      slideOpen()
   }


   return (
      <View>
         <BookScroll data={data.bookData || []} handleBookModalOpen={handleBookModalOpen} />

         <Animated.View
            style={[
               styles.modalContainer,
               { transform: [{ translateX: xPos }] }
            ]}
         >
            {
               selectedBookData && modalVisible &&
               <BookModal 
                  handleClose={slideClosed}
                  data={selectedBookData} 
               />
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
      // top: 100,
      left: Dimensions.get('window').width * -1,
      backgroundColor: 'white',
      width: '100%',
      height: "100%"
   }
});