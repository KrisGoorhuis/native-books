import React from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { BookData } from '../../model/BookData'
import { State } from '../../redux'
import BookModal from '../BookScroll/BookModal'
import BookScroll from '../BookScroll/BookScroll'


const xPos = new Animated.Value(0) // Very not DRY. Fix it in the next project

export default function Library() {
   const bookLibrary = useSelector((state: State) => state.library.library)
   const [selectedBookData, setSelectedBookData] = React.useState<BookData | null>(null)
   const [modalVisible, setModalVisible] = React.useState<boolean>(false)


   const slideOpen = () => {
      Animated.spring(xPos, {
         toValue: new Animated.Value(Dimensions.get('screen').width),
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
         {
            bookLibrary.length > 0 
            ? <BookScroll data={bookLibrary} handleBookModalOpen={handleBookModalOpen} />
            : <View style={styles.empty}>
               <Text style={styles.text}>You don't have any books in your library yet.</Text>
               <Text style={styles.text}>Go explore!</Text>
            </View>
         }
         
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
   empty: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   text: {
      textAlign: 'center',
      marginBottom: 10
   },
   modalContainer: {
      position: 'absolute',
      // top: 100,
      left: Dimensions.get('window').width * -1,
      backgroundColor: 'white',
      width: '100%',
      height: "100%"
   }
})