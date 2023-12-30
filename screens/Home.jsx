import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Dialog, Button, TextInput } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import TaskCard from '../components/TaskCard';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearError, clearMessage, loadUser, updateTask, deleteTask } from '../redux/action.js';

const Main = ({ navigation, ...rest }) => {

    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.task);
    const { user } = useSelector((state) => state.auth);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(!openDialog)
    };

    const [task, setTask] = useState({
        _id: '',
        title: '',
        description: '',
        completed: false,
    });

    const handleTaskInputChange = (name, value) => {
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleAddTask = async () => {
        await dispatch(addTask(task.title, task.description));
        await dispatch(loadUser());
    };

    const handleTaskCheck = async (_id) => {
        await dispatch(updateTask(_id));
        await dispatch(loadUser());
    };

    const handleDeleteTask = async (_id) => {
        await dispatch(deleteTask(_id));
        await dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
        if (message) {
            alert(message);
            dispatch(clearMessage());
        }
    }, [error, message, dispatch, alert]);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headingText}>Your Tasks List</Text>
                <ScrollView>
                    {user && user.tasks.map((item) => {
                        const { _id, title, description, completed } = item;
                        return (
                            <TaskCard
                                key={_id}
                                _id={_id}
                                title={title}
                                description={description}
                                completed={completed}
                                handleTaskCheck={handleTaskCheck}
                                handleDeleteTask={handleDeleteTask}
                            />
                        )
                    })}
                    <View style={styles.addBtnContainer}>
                        <Pressable style={styles.addBtn} onPress={() => handleDialogOpen()}>
                            <Icon name='add-to-list' style={styles.addIcon} />
                            <Text style={styles.addText}>Add</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            <Dialog visible={openDialog} onDismiss={handleDialogOpen} style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                <Dialog.Title style={{ textAlign: 'center', fontWeight: '500' }}>
                    Add Task
                </Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTaskInputChange('title', text)}
                        value={task.title}
                        mode='outlined'
                        placeholder='Add Title'
                    />
                    <TextInput
                        style={styles.dialogInput}
                        onChangeText={(text) => handleTaskInputChange('description', text)}
                        value={task.description}
                        mode='outlined'
                        placeholder='Add Description'
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode='contained-tonal' onPress={() => handleDialogOpen()}>Cancel</Button>
                    <Button mode='contained-tonal' onPress={() => handleAddTask()} disabled={!task.title || !task.description || loading}>Add Task</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

const Home = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    headingText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: '#474747',
        marginVertical: 15,
        width: '100%',
    },
    addBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    addBtn: {
        flexDirection: 'row',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        elevation: 1,
    },
    addIcon: {
        fontSize: 24,
        color: '#900',
        marginHorizontal: 10,
    },
    addText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#900',
    },
    dialogInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 16,
    }
});