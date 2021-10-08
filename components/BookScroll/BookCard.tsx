import React from 'react'
import { GestureResponderEvent, TouchableHighlight } from 'react-native'
import { BookData } from '../../model/BookData'
import { StyleSheet, Image, Text, View } from 'react-native';



interface BookCardProps {
   data: BookData
   onPress: (data: BookData) => void
}

const BookCard = (props: BookCardProps) => {
   const volumeInfo = props.data.volumeInfo


   return (
      <TouchableHighlight
         underlayColor='none'
         style={styles.container}
         onPress={(event: GestureResponderEvent) => {
            console.log("props.data")
            console.log(props.data)
            props.onPress(props.data)
         }}
      >
         <View>

            {
               volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
                  ? <Image resizeMode="contain" style={styles.image} source={{ uri: volumeInfo.imageLinks.thumbnail || "" }}></Image>
                  : <View style={styles.noImage}>
                     <Text>{volumeInfo.title}</Text>
                     <Text>(no image)</Text>
                  </View>
            }

         </View>

      </TouchableHighlight>
   )
}

export default BookCard

const styles = StyleSheet.create({
   container: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10
   },
   card: {
      borderRadius: 4,
      alignSelf: "center",
      marginHorizontal: "1%",
      marginBottom: 6,
      minWidth: "48%",
      textAlign: "center",
   },
   image: {
      width: 160,
      height: 250,
      borderRadius: 5,
   },
   noImage: {
      height: 100,
      width: 160,
      borderRadius: 5,
      transform: [{ scale: 1 }],
      zIndex: 3,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'gray',
      borderWidth: 1,
   },
});
