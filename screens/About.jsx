import React from 'react';
import { Text, StyleSheet, Image, ScrollView } from 'react-native';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import AboutImg from '../assets/about1.jpg';

const Main = ({ navigation, ...rest }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Welcome To Taskify</Text>
            <Image source={AboutImg} style={styles.image} resizeMode="stretch" />
            <Text style={styles.description}>
                Taskify is a simple and efficient task management app designed to help you organize your daily activities. With Taskify, you can easily create, update, and track your tasks, ensuring you stay productive and on top of your schedule.
            </Text>
            <Text style={styles.listHeading}>
                Key Features:
            </Text>
            <Text style={styles.feature}>
                • Create and manage tasks effortlessly.
            </Text>
            <Text style={styles.feature}>
                • Update task details and mark tasks as completed.
            </Text>
            <Text style={styles.feature}>
                • Personalize your profile with a unique avatar.
            </Text>
            <Text style={styles.feature}>
                • Change your password and verify your account for added security.
            </Text>
        </ScrollView>
    );
};

const About = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: '#474747',
        marginTop: 20,
        marginBottom: 5,
        width: '100%',
    },
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
        marginVertical: 15,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        lineHeight: 22,
    },
    listHeading: {
        fontSize: 18,
        fontWeight: '500',
        color: '#474747',
        marginBottom: 15,
        lineHeight: 22,
    },
    feature: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 10,
    },
});

