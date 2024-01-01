import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Footer = () => {
    const navigation = useNavigation();
    const { loading, isAuthenticated } = useSelector(state => state.auth);
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate(isAuthenticated ? 'Home' : 'About')} disabled={loading}>
                <Icon name='home' style={styles.btnIcon} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate(isAuthenticated ? 'Profile' : 'SignIn')} disabled={loading}>
                <Icon name='user' style={styles.btnIcon} />
            </Pressable>
        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
    },
    btnIcon: {
        color: '#900',
        fontSize: 26,
    }
});