import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { BookData } from '../../model/BookData'



interface BookModalProps {
    data: BookData
}

const BookModal = (props: BookModalProps) => {


    console.log("props.data.volumeInfo.categories")
    console.log(props.data.volumeInfo.categories)
    console.log("props.data.volumeInfo.infoLink")
    console.log(props.data.volumeInfo.infoLink)
    return (
        <View>
            <Text>{props.data.volumeInfo.title}</Text>
            <Text>{props.data.volumeInfo.subtitle}</Text>
            <Image source={{uri: props.data.volumeInfo.imageLinks.thumbnail}} />
            {/* <Text>{props.data.volumeInfo}</Text>
            <Text>{props.data.volumeInfo}</Text> */}
        </View>
    )
}

export default BookModal

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
    }
});
