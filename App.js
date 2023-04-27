import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList
} from "react-native";

import { FontAwesome } from '@expo/vector-icons'
import Task from './src/task'

export default function App() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([
        { key: '1', task: 'task 1' },
        { key: '2', task: 'task 2' },
    ])

    function handlerAdd() {
        if (task === '') return

        const data = {
            key: task,
            task: task
        }

        setTask('')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TO-DO</Text>

            <View style={styles.containerInput}>
                <TextInput
                    placeholder="task"
                    style={styles.input}
                    onChangeText={(text) => setTask(text)}
                />

                <TouchableOpacity style={styles.buttonAdd} >
                    <FontAwesome name="plus" size={25} color={'#fff'} onPress={handlerAdd} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => <Task data={item} />}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#22272e",
        paddingTop: 50,
    },
    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    // ===== input =====
    containerInput: {
        flexDirection: "row",
        width: '100%',
        height: 44,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        marginLeft: 20,
        width: '70%',
        height: 44,
        borderRadius: 4,
        paddingLeft: 10,
    },
    buttonAdd: {
        backgroundColor: "#73f7ff",
        color: "#fff",

        width: '15%',
        height: 44,

        marginRight: 20,
        marginLeft: 10,
        borderRadius: 4,

        alignItems: "center",
        justifyContent: "center",
    },
    // ===== Tasks-list =====
    list: { 
        flex: 1,
        backgroundColor: "#fff",

        padding: 10,
    }
});
