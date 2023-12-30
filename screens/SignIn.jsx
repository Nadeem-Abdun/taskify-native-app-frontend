import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, clearMessage } from '../redux/action';

const Main = ({ navigation, ...rest }) => {

    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.auth);

    const [showPassword, setShowPassword] = useState(true);

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const handleLoginFieldChange = (name, value) => {
        setLogin({
            ...login,
            [name]: value
        });
    };

    const handleLoginClick = () => {
        dispatch(loginUser(login.email, login.password));
        setLogin({
            email: '',
            password: ''
        });
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
                <Text style={styles.headingText}>WELCOME</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='email-address'
                    placeholder='Email'
                    mode='outlined'
                    value={login.email}
                    onChangeText={(text) => handleLoginFieldChange('email', text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    mode='outlined'
                    secureTextEntry={showPassword}
                    value={login.password}
                    onChangeText={(text) => handleLoginFieldChange('password', text)}
                    right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(!showPassword)} />}
                />
                <Pressable style={styles.loginBtn} onPress={() => handleLoginClick()}>
                    <Text style={styles.loginBtnTxt}>LOGIN</Text>
                </Pressable>
                <Text style={styles.signUpHelperText}>Or</Text>
                <Pressable style={styles.signUpBtn} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpBtnTxt}>Sign Up</Text>
                </Pressable>
                <Text style={styles.signUpHelperText}>Update Password</Text>
            </View >
        </>
    )
}

const SignIn = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
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
    textInput: {
        borderColor: '#b5b5b5',
        paddingLeft: 5,
        borderRadius: 5,
        marginVertical: 12,
        fontSize: 14,
        width: '75%',
    },
    loginBtn: {
        backgroundColor: '#900',
        paddingVertical: 12,
        borderRadius: 5,
        width: '75%',
    },
    loginBtnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    signUpBtn: {
        paddingVertical: 12,
        borderRadius: 5,
    },
    signUpBtnTxt: {
        color: '#900',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    signUpHelperText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
    },
});