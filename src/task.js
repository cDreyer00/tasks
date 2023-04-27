import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

export default function Task({ data }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <FontAwesome name="trash" size={25} color={'#22272e'} />
            </TouchableOpacity>

            <Text style={styles.text}>{data.task}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(196, 196, 196, 0.5)',
        marginTop: 12,
        padding: 12,
        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    button: {
        marginRight: 12,
    }

})