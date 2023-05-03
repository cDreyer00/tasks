import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'

import { FontAwesome } from '@expo/vector-icons'
import Task from './src/task'

import wait from 'cdreyer-utilities'

export default function App() {
    const [inputTask, setInputTask] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchData() {
            await retrieveData()
        }
        fetchData();
    }, []) 

    const handleSetTasks = async (newTasks) => {
        await setTasks(newTasks)
        await saveData(newTasks)
    }
    
    const retrieveData = async () => {
        const response = await AsyncStorage.getItem('tasks')
        const storageTasks = await JSON.parse(response)
        
        if (storageTasks) {
            handleSetTasks(storageTasks)
        }
    }

    const saveData = async (tasks) => {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }

    async function handlerAdd() {
        if (inputTask === '') return

        const data = {
            key: Date.now(),
            title: inputTask,
            check: false,
        }
        handleSetTasks([...tasks, data])
        setInputTask('')
    }

    async function handleDelete(item) {
        let filterTasks = tasks.filter(task => task.title !== item);
        handleSetTasks(filterTasks)
    }

    async function handleCheck(item) {
        item.check = !item.check
        let newTasks = tasks.map(task => task.title === item.title ? item : task)
        handleSetTasks(newTasks)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TO-DO</Text>

            <View style={styles.containerInput}>
                <TextInput
                    placeholder="task"
                    style={styles.input}
                    onChangeText={(text) => setInputTask(text)}
                    value={inputTask}
                />

                <TouchableOpacity style={styles.buttonAdd} onPress={handlerAdd}>
                    <FontAwesome name="plus" size={25} color={'#fff'} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => <Task data={item} handleDelete={() => handleDelete(item.title)} handleCheck={() => handleCheck(item)} />}
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
