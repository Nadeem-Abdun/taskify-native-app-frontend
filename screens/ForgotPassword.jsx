import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import SafeAreaViewAndroid from '../utils/SafeAreaViewAndroid';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/action';
import Toast from 'react-native-toast-message';

const Main = ({ navigation, ...rest }) => {
    const dispatch = useDispatch();
    const { user: authUser, loading: authLoading, error: authError, message: authMessage } = useSelector(state => state.auth);
    const { loading: taskLoading, error: taskError, message: taskMessage } = useSelector(state => state.task);
    const { loading: profileLoading, error: profileError, message: profileMessage } = useSelector(state => state.profile);
    const { loading: passwordLoading, error: passwordError, message: passwordMessage } = useSelector(state => state.password);

    const [forgotPass, setForgotPass] = useState({
        email: '',
    });

    const handleTextFieldChange = (name, value) => {
        setForgotPass({
            ...forgotPass,
            [name]: value
        });
    };

    const handleSendOTP = async () => {
        await dispatch(forgotPassword(forgotPass.email));
        await navigation.navigate('ResetPassword');
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
        <View style={styles.container}>
            <Text style={styles.headingText}>Taskify - Recover Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Email'
                keyboardType='email-address'
                mode='outlined'
                value={forgotPass.email}
                onChangeText={(text) => handleTextFieldChange('email', text)}
            />
            <Button mode='contained' labelStyle={{ fontSize: 18, fontWeight: '600' }} style={styles.otpBtn} textColor='#fff' onPress={() => handleSendOTP()} loading={passwordLoading} disabled={!forgotPass.email}>
                Send OTP
            </Button>
        </View >
    )
}

const ForgotPassword = ({ navigation, ...rest }) => {
    return (
        <SafeAreaViewAndroid Component={Main} navigation={navigation} {...rest} />
    )
}

export default ForgotPassword;

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
    otpBtn: {
        backgroundColor: '#900',
        paddingVertical: 5,
        marginVertical: 12,
        borderRadius: 5,
        width: '75%',
    },
});