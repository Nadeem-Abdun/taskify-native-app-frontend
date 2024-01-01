import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Dialog, Button, TextInput } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import TaskCard from '../components/TaskCard';
import Icon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearError, clearMessage, loadUser, updateTask, deleteTask } from '../redux/action.js';
import Toast from 'react-native-toast-message';

const Main = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const { user: authUser, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

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
        if (authError || taskError || profileError || passwordError) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `${authError || ''} ${taskError || ''} ${profileError || ''} ${passwordError || ''}`,
                visibilityTime: 4000,
                autoHide: true,
                text1Style: {
                    fontSize: 20,
                    fontWeight: '600'
                },
                text2Style: {
                    fontSize: 18,
                    fontWeight: '500'
                },
            });
            dispatch(clearError());
        }
        if (authMessage || taskMessage || profileMessage || passwordMessage) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `${authMessage || ''} ${taskMessage || ''} ${profileMessage || ''} ${passwordMessage || ''}`,
                visibilityTime: 4000,
                autoHide: true,
                text1Style: {
                    fontSize: 20,
                    fontWeight: '600'
                },
                text2Style: {
                    fontSize: 18,
                    fontWeight: '500'
                },
            });
            dispatch(clearMessage());
        }
    }, [authError, authMessage, taskError, taskMessage, profileError, profileMessage, passwordError, passwordMessage, dispatch]);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headingText}>Taskify - Task List</Text>
                <ScrollView>
                    {authUser && authUser.tasks.map((item) => {
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
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handleDialogOpen()}>Cancel</Button>
                    <Button mode='contained' style={styles.dialogBtn} textColor='#fff' onPress={() => handleAddTask()} disabled={!task.title || !task.description || taskLoading} loading={taskLoading}>Add Task</Button>
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
        backgroundColor: '#fff',
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
    },
    dialogBtn: {
        borderRadius: 10,
        paddingHorizontal: 5,
    }
});