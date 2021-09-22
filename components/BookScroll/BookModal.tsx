import React from 'react'
import { View, Text } from 'react-native'
import { BookData } from '../../model/BookData'
import { StyleSheet, Modal } from 'react-native';



interface BookModalProps {
    data: BookData
}

const BookModal = (props: BookModalProps) => {


    return (
        <View>
            <Text>Book modal</Text>
        </View>
    )
}

export default BookModal

const styles = StyleSheet.create({
    container: {

    }
});
