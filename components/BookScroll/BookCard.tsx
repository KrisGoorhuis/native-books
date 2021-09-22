import React from 'react'
import { View, Text, Pressable, GestureResponderEvent, Modal } from 'react-native'
import { BookData } from '../../model/BookData'
import { StyleSheet, Image } from 'react-native';



interface BookCardProps {
   data: BookData
   onPress: (data: BookData) => void
}

const BookCard = (props: BookCardProps) => {
   const volumeInfo = props.data.volumeInfo

   return (
      <View style={styles.container}>
         {
            <Pressable
               style={({ pressed }) => [
                  {
                     opacity: pressed
                        ? .7
                        : 1
                  },
                  styles.card
               ]}
               pressRetentionOffset={10}
               onPress={(event: GestureResponderEvent) => props.onPress(props.data)}
            >
               {/* <Text style={{color: 'black'}}>{volumeInfo.title}</Text> */}
               <Image style={styles.image} source={{ uri: volumeInfo.imageLinks.thumbnail }}></Image>
            </Pressable>
         }


      </View>
   )
}

export default BookCard

const styles = StyleSheet.create({
   container: {
      width: '50%',
      display: 'flex',
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
      borderRadius: 10,
      width: 160,
      height: 200,
   },
});
