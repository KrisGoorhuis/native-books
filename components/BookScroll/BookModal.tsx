import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Alert, Pressable } from 'react-native'
import { BookData } from '../../model/BookData'
import { MaterialIcons } from '@expo/vector-icons'


interface BookModalProps {
   data: BookData
}
const BookModal = (props: BookModalProps) => {
   const volumeInfo = props.data.volumeInfo

   const handleWebLink = async () => {
      const supported = await Linking.canOpenURL(volumeInfo.infoLink);

      if (supported) {
         await Linking.openURL(volumeInfo.infoLink);
      } else {
         Alert.alert(`The machine doesn't know how to open this URL: ${volumeInfo.infoLink}`);
      }
   }

   const handleAudiobookLink = async () => {
      Alert.alert(`This link is fake!`);
   }

   console.log("volumeInfo")
   console.log(volumeInfo)


   return (
      <View style={styles.container}>
         <Text style={styles.genre}>{volumeInfo.categories[0] || ""}</Text>
         <Text style={styles.title}>{volumeInfo.title}</Text>
         {
            volumeInfo.subtitle &&
            <Text style={styles.subtitle}>{volumeInfo.subtitle}</Text>
         }

         <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail }} />

            <View style={styles.shadow}></View>
            <View style={styles.imageOverlay}>
               <Pressable onPress={handleWebLink} style={styles.infoContainer}>
                  <MaterialIcons style={styles.info} name="info" />
               </Pressable>
               <View style={styles.audiobook}>
                  <MaterialIcons style={styles.audioChild} name="play-arrow" />
                  <Text style={styles.audioChild}>Audio Book</Text>
               </View>
            </View>
         </View>

         <View style={styles.publishingInfo}>
            <Text>Published by {volumeInfo.publisher}</Text>
            <Text>{volumeInfo.publishedDate}</Text>
         </View>

         <Text style={styles.link} onPress={handleWebLink}>View on the web</Text>
         <Text numberOfLines={5}>{volumeInfo.description}</Text>
      </View>
   )
}

export default BookModal

const imageDimensions = {
   width: 160,
   height: 200,
}

const buttonHeight = 30

const styles = StyleSheet.create({
   container: {
      padding: 20
   },
   genre: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'burlywood',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   subtitle: {
      fontSize: 16
   },
   imageContainer: {
      padding: 10,
      position: 'relative',
      flexDirection: 'row',
   },
   image: {
      ...imageDimensions,
      borderRadius: 20,
      transform: [{ scale: 1 }],
      left: 50,
      zIndex: 3,
      position: 'relative'
   },
   infoContainer: {
      backgroundColor: '#fc5324',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: buttonHeight,
      width: buttonHeight,
      borderRadius: 5,
   },
   info: {
      color: 'white',
   },
   imageOverlay: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 15,
      right: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 130,
   },
   audiobook: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'midnightblue',
      color: 'white',
      width: 95,
      borderRadius: 5,
      height: buttonHeight,
      paddingLeft: 5,
      paddingRight: 5,
   },
   audioChild: {
      color: 'white',
      fontSize: 12
   },
   shadow: {
      ...imageDimensions,
      borderRadius: 20,
      backgroundColor: 'whitesmoke',
      left: 20,
      top: 10,
      zIndex: 2,
      position: 'absolute',
   },
   publishingInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   link: {
      color: 'blue'
   }
})
