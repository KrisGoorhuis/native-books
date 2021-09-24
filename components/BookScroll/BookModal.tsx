import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Alert } from 'react-native'
import { BookData } from '../../model/BookData'
import { MaterialIcons } from '@expo/vector-icons'


interface BookModalProps {
    data: BookData
}
const BookModal = (props: BookModalProps) => {
    const volumeInfo = props.data.volumeInfo

    const handlePress = async () => {
        const supported = await Linking.canOpenURL(volumeInfo.infoLink);

        if (supported) {
            await Linking.openURL(volumeInfo.infoLink);
        } else {
            Alert.alert(`Don't know how to open this URL: ${volumeInfo.infoLink}`);
        }
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
            </View>

            <View style={styles.publishingInfo}>
                <Text>Published by {volumeInfo.publisher}</Text>
                <Text>{volumeInfo.publishedDate}</Text>
            </View>
            <MaterialIcons name="info" />
            <Text style={styles.link} onPress={handlePress}>View on the web</Text>
            <Text numberOfLines={5}>{volumeInfo.description}</Text>
        </View>
    )
}

export default BookModal

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
        flexDirection: 'row'
    },
    image: {
        width: 160,
        height: 200,
        borderRadius: 20,
        transform: [{scale: 1}],
        left: 50,
        zIndex: 3,
        position: 'relative'
    },
    shadow: {
        borderRadius: 20,
        backgroundColor: 'whitesmoke',
        left: 20,
        top: 10,
        zIndex: 2,
        position: 'absolute',
        width: 160,
        height: 200,
    },
    publishingInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    link: {
        color: 'blue'
    }
});
