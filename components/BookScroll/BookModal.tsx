import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Alert, Pressable } from 'react-native'
import { BookData } from '../../model/BookData'
import { MaterialIcons } from '@expo/vector-icons'
import { Appbar, Button, Menu, Snackbar } from 'react-native-paper'
import { addToLibrary, removeFromLibrary } from '../../redux/slices/library'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import { TouchableOpacity } from 'react-native-gesture-handler'


interface BookModalProps {
   handleClose: () => void,
   data: BookData
}
const BookModal = (props: BookModalProps) => {
   const volumeInfo = props.data.volumeInfo
   const [menuOpen, setMenuOpen] = React.useState<boolean>(false)
   const [snackbarVisible, setSnackbarVisible] = React.useState<boolean>(false)
   const [snackbarText, setSnackbarText] = React.useState<string>("")

   const dispatch = useDispatch()
   const bookLibrary = useSelector((state: State) => state.library.library)
   const isInLibrary = bookLibrary.some((book: BookData) => book.id === props.data.id)
   console.log("props.data.id")
   console.log(props.data.id)

   const handleWebLink = async () => {
      const supported = await Linking.canOpenURL(volumeInfo.infoLink);

      if (supported) {
         await Linking.openURL(volumeInfo.infoLink)
      } else {
         Alert.alert(`The machine doesn't know how to open this URL: ${volumeInfo.infoLink}`)
      }
   }

   const handleAudiobookLink = async () => {
      Alert.alert(`This link is fake!`)
   }

   const handleToggleLibrary = () => {

      if (isInLibrary) {
         setSnackbarText("Removed from library")
         setSnackbarVisible(true)
         dispatch(removeFromLibrary(props.data.id))
      }
      else {
         setSnackbarText("Added to library")
         setSnackbarVisible(true)
         dispatch(addToLibrary(props.data))
      }
   }

   const openMenu = () => setMenuOpen(true)
   const closeMenu = () => setMenuOpen(false)
   const onDismissSnackBar = () => setSnackbarVisible(false)



   // console.log("isInLibrary")
   // console.log(isInLibrary)

   // console.log("bookLibrary")
   // console.log(bookLibrary)



   return (
      <View>

         <View style={styles.container}>
            <View style={styles.topControl}>
               <Appbar.BackAction onPress={props.handleClose} />
               <Menu
                  visible={menuOpen}
                  onDismiss={closeMenu}
                  anchor={<Button style={{ width: 10 }} icon={"menu"} onPress={openMenu}> </Button>}
               >
                  <Menu.Item onPress={handleWebLink} title="View On the Web" />
                  <Menu.Item onPress={handleAudiobookLink} title="Audiobook" />
                  <Menu.Item onPress={handleToggleLibrary} title={isInLibrary ? "Remove From Library" : "Add To Library"} />
               </Menu>
            </View>

            <Text style={styles.genre}>{volumeInfo.categories && volumeInfo.categories[0]}</Text>
            <Text style={styles.title}>{volumeInfo.title || "No title"}</Text>

            {/* {
               volumeInfo.subtitle &&
               <Text style={styles.subtitle}>{volumeInfo.subtitle}</Text>
            } */}

            <View style={styles.publishingInfo}>
               <Text style={{ color: "darkgray" }}>Published by <Text style={{ color: "midnightblue" }}>{volumeInfo.publisher}</Text></Text>
               <Text>{volumeInfo.publishedDate}</Text>
            </View>

            <View>
               <View style={styles.imageContainer}>
                  {
                     volumeInfo.imageLinks
                        ? <Image resizeMode="contain" style={styles.image} source={{ uri: volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail }} />
                        : <View style={styles.noImage}>
                           <Text>{volumeInfo.title}</Text>
                           <Text>(no image)</Text>
                        </View>
                  }
                  <View style={styles.shadow}></View>
               </View>
            </View>

            <View style={styles.imageFoot}>
               <TouchableOpacity onPress={handleWebLink} style={styles.infoContainer}>
                  <MaterialIcons style={styles.info} name="info" />
               </TouchableOpacity>
               <TouchableOpacity onPress={handleAudiobookLink}>
                  <View style={styles.audiobook}>
                     <MaterialIcons style={styles.audioChild} name="play-arrow" />
                     <Text style={styles.audioChild}>Audio Book</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={handleToggleLibrary}>
                  <View style={styles.add}>
                     <MaterialIcons style={styles.info} name={isInLibrary ? "remove" : "add"} />
                     <Text style={styles.audioChild}>{isInLibrary ? "" : ""} Library</Text>
                  </View>
               </TouchableOpacity>
            </View>

            <Text numberOfLines={5}>{volumeInfo.description}</Text>
         </View>

         <Snackbar
            visible={snackbarVisible}
            onDismiss={onDismissSnackBar}
            duration={2000}
         >
            {snackbarText}
         </Snackbar>

      </View>
   )
}

export default BookModal

const imageDimensions = {
   width: 160,
   height: 250,
}

const buttonHeight = 30

const styles = StyleSheet.create({
   container: {
      padding: 20
   },
   topControl: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
   },
   genre: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'burlywood',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 6,
      marginBottom: 10,
   },
   subtitle: {
      fontSize: 16
   },
   imageContainer: {
      padding: 10,
   },
   image: {
      ...imageDimensions,
      borderRadius: 5,
      transform: [{ scale: 1 }],
      left: 50,
      zIndex: 3,
      position: 'relative',
   },
   noImage: {
      ...imageDimensions,
      borderRadius: 5,
      transform: [{ scale: 1 }],
      zIndex: 3,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      left: 10,
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
   imageFoot: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 130,
      paddingLeft: 10,
      margin: 10,
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
      marginLeft: 5
   },
   add: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'orange',
      color: 'white',
      width: 70,
      borderRadius: 5,
      height: buttonHeight,
      paddingLeft: 5,
      paddingRight: 5,
      marginLeft: 5
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
      justifyContent: 'space-between',
      marginBottom: 10
   },
})

