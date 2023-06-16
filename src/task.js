import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function Task({ data, handleDelete, handleCheck }) {

    let checkName = data.check ? 'check-square-o' : 'square-o'
    let color = data.check ? 'rgba(0,255, 25, 0.5)' : 'rgba(196, 196, 196, 0.5)'
    return (
        <View style={styles(color).container}>
            <TouchableOpacity style={styles().deleteButton} onPress={handleDelete}>
                <FontAwesome name="trash" size={25} color={'#22272e'} />
            </TouchableOpacity>

            <Text style={styles().text}>{data.title}</Text>

            <TouchableOpacity style={styles().checkButton} onPress={handleCheck}>
                <FontAwesome name={checkName} size={25} color={'#22272e'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = (color) => StyleSheet.create({
    container: {
        backgroundColor: color,
        marginTop: 12,
        padding: 12,
        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        maxWidth: '80%',
    },
    deleteButton: {
        marginRight: 12,
    },
    checkButton: {
        right: 0,
        width: 25,
    }
})