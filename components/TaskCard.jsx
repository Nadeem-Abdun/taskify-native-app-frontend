import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const TaskCard = (props) => {

    const { _id, title, description, completed, handleTaskCheck, handleDeleteTask } = props;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>{title}</Text>
                <Text style={styles.taskDescription}>{description}</Text>
            </View>
            <Checkbox status={completed ? 'checked' : 'unchecked'} onPress={() => handleTaskCheck(_id)} />
            <Icon name="delete" style={styles.deleteIcon} onPress={() => handleDeleteTask(_id)} />
        </View>
    )
}

export default TaskCard;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    taskContainer: {
        width: '70%',
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 7,
        color: '#900',
    },
    taskDescription: {
        color: '#474747'
    },
    deleteIcon: {
        color: '#fff',
        backgroundColor: '#900',
        borderRadius: 40,
        padding: 8,
        fontSize: 20,
        marginVertical: 7,
    },
});